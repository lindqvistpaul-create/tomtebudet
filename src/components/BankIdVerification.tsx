import { useCallback, useEffect, useRef, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { Button } from "@/components/ui/button";
import { Fingerprint, Loader2, Smartphone, QrCode, XCircle, CheckCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

// Recommended Swedish user messages (BankID RFA texts, abbreviated)
const HINT_MESSAGES: Record<string, string> = {
  outstandingTransaction: "Starta BankID-appen.",
  noClient: "Starta BankID-appen.",
  userSign: "Skriv in din säkerhetskod i BankID-appen och välj Identifiera.",
  started: "Söker efter BankID...",
  userCallConfirm: "Bekräfta i BankID-appen.",
  expiredTransaction: "BankID-identifieringen tog för lång tid. Försök igen.",
  certificateErr: "Ditt BankID är spärrat eller ogiltigt. Kontakta din bank.",
  userCancel: "Identifieringen avbröts.",
  cancelled: "Identifieringen avbröts.",
  startFailed: "BankID-appen verkar inte finnas på din enhet, eller kunde inte läsas. Försök igen.",
};

type Phase = "idle" | "starting" | "pending" | "complete" | "failed";

interface BankIdVerificationProps {
  onVerified: (name?: string) => void;
}

const BankIdVerification = ({ onVerified }: BankIdVerificationProps) => {
  const [phase, setPhase] = useState<Phase>("idle");
  const [mode, setMode] = useState<"qr" | "thisDevice">("qr");
  const [qr, setQr] = useState<string | null>(null);
  const [hint, setHint] = useState<string>("");
  const [verifiedName, setVerifiedName] = useState<string | undefined>();
  const orderRefRef = useRef<string | null>(null);
  const pollTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const stoppedRef = useRef(false);

  const invoke = async (body: Record<string, unknown>) => {
    const { data, error } = await supabase.functions.invoke("bankid", { body });
    if (error) throw new Error(error.message);
    if (data?.error) throw new Error(data.error);
    return data;
  };

  const stopPolling = useCallback(() => {
    stoppedRef.current = true;
    if (pollTimer.current) clearTimeout(pollTimer.current);
  }, []);

  useEffect(() => () => stopPolling(), [stopPolling]);

  const poll = useCallback(async () => {
    if (stoppedRef.current || !orderRefRef.current) return;
    try {
      const data = await invoke({ action: "collect", orderRef: orderRefRef.current });
      if (stoppedRef.current) return;

      if (data.status === "complete") {
        setPhase("complete");
        const name = data.completionData?.user?.name;
        setVerifiedName(name);
        toast.success("BankID-verifiering lyckades!");
        onVerified(name);
        return;
      }
      if (data.status === "failed") {
        setPhase("failed");
        setHint(HINT_MESSAGES[data.hintCode] ?? "Identifieringen misslyckades. Försök igen.");
        return;
      }
      // pending
      if (data.qr) setQr(data.qr);
      setHint(HINT_MESSAGES[data.hintCode] ?? "Väntar på BankID...");
      pollTimer.current = setTimeout(poll, 1500);
    } catch (err) {
      if (stoppedRef.current) return;
      setPhase("failed");
      setHint((err as Error).message);
    }
  }, [onVerified]);

  const start = async (selectedMode: "qr" | "thisDevice") => {
    setMode(selectedMode);
    setPhase("starting");
    setHint("");
    stoppedRef.current = false;
    try {
      const data = await invoke({ action: "start" });
      orderRefRef.current = data.orderRef;
      setQr(data.qr);
      setPhase("pending");

      if (selectedMode === "thisDevice" && data.autoStartToken) {
        // Open the BankID app on this device
        window.location.href = `bankid:///?autostarttoken=${data.autoStartToken}&redirect=null`;
      }
      pollTimer.current = setTimeout(poll, 1500);
    } catch (err) {
      setPhase("failed");
      setHint((err as Error).message);
    }
  };

  const cancel = async () => {
    stopPolling();
    if (orderRefRef.current) {
      invoke({ action: "cancel", orderRef: orderRefRef.current }).catch(() => {});
    }
    setPhase("idle");
    setQr(null);
    setHint("");
  };

  if (phase === "complete") {
    return (
      <div className="bg-primary/10 rounded-2xl p-8 text-center">
        <div className="w-20 h-20 mx-auto mb-4 bg-primary rounded-full flex items-center justify-center">
          <CheckCircle className="w-10 h-10 text-primary-foreground" />
        </div>
        <h3 className="font-medium text-foreground text-lg">Verifierad!</h3>
        <p className="text-sm text-muted-foreground">
          {verifiedName
            ? `${verifiedName} har verifierats med BankID`
            : "Din identitet har bekräftats med BankID"}
        </p>
      </div>
    );
  }

  if (phase === "idle" || phase === "failed") {
    return (
      <div className="space-y-4">
        {phase === "failed" && (
          <div className="flex items-center justify-center gap-2 text-destructive text-sm">
            <XCircle className="w-4 h-4 shrink-0" />
            <span>{hint}</span>
          </div>
        )}
        <Button variant="hero" size="xl" className="w-full" onClick={() => start("thisDevice")}>
          <Smartphone className="w-5 h-5" />
          Öppna BankID på den här enheten
        </Button>
        <Button variant="outline" size="xl" className="w-full" onClick={() => start("qr")}>
          <QrCode className="w-5 h-5" />
          Använd BankID på annan enhet
        </Button>
      </div>
    );
  }

  // starting / pending
  return (
    <div className="space-y-6">
      <div className="bg-muted/30 rounded-2xl p-8">
        {mode === "qr" && qr && phase === "pending" ? (
          <div className="w-44 h-44 mx-auto mb-4 bg-white rounded-xl flex items-center justify-center p-3">
            <QRCodeSVG value={qr} size={160} />
          </div>
        ) : (
          <div className="w-32 h-32 mx-auto mb-4 bg-background rounded-xl flex items-center justify-center border-2 border-dashed border-border">
            {phase === "starting" ? (
              <Loader2 className="w-16 h-16 text-primary animate-spin" />
            ) : (
              <Fingerprint className="w-16 h-16 text-primary animate-pulse" />
            )}
          </div>
        )}
        <p className="text-sm text-muted-foreground">
          {phase === "starting"
            ? "Startar BankID..."
            : mode === "qr"
              ? hint || "Öppna BankID-appen och skanna QR-koden"
              : hint || "Väntar på BankID..."}
        </p>
      </div>
      <Button variant="ghost" className="w-full" onClick={cancel}>
        Avbryt
      </Button>
    </div>
  );
};

export default BankIdVerification;

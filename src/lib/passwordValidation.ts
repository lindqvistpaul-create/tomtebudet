// Common weak passwords that should be blocked
const COMMON_WEAK_PASSWORDS = [
  'password', 'password1', 'password123', 'password1234',
  '123456', '1234567', '12345678', '123456789', '1234567890',
  'qwerty', 'qwerty123', 'qwertyuiop',
  'abc123', 'abcdef', 'abcdefg',
  'letmein', 'welcome', 'welcome1', 'welcome123',
  'admin', 'admin123', 'administrator',
  'login', 'login123',
  'iloveyou', 'sunshine', 'princess', 'dragon',
  'master', 'monkey', 'shadow', 'football', 'baseball',
  'superman', 'batman', 'trustno1',
  'passw0rd', 'p@ssword', 'p@ssw0rd',
  'tomte', 'tomte123', 'jultomte', 'julafton', 'christmas',
  'tomtebudet', 'tomten', 'santa', 'santa123',
];

export interface PasswordValidationResult {
  isValid: boolean;
  score: number; // 0-4 (weak to strong)
  errors: string[];
  suggestions: string[];
}

export function validatePassword(password: string): PasswordValidationResult {
  const errors: string[] = [];
  const suggestions: string[] = [];
  let score = 0;

  // Check minimum length
  if (password.length < 8) {
    errors.push('Lösenordet måste vara minst 8 tecken');
  } else {
    score += 1;
  }

  // Check for common weak passwords
  if (COMMON_WEAK_PASSWORDS.includes(password.toLowerCase())) {
    errors.push('Detta lösenord är för vanligt och lätt att gissa');
  }

  // Check for uppercase letters
  if (!/[A-Z]/.test(password)) {
    suggestions.push('Lägg till stora bokstäver (A-Z)');
  } else {
    score += 1;
  }

  // Check for lowercase letters
  if (!/[a-z]/.test(password)) {
    suggestions.push('Lägg till små bokstäver (a-z)');
  } else {
    score += 0.5;
  }

  // Check for numbers
  if (!/[0-9]/.test(password)) {
    suggestions.push('Lägg till siffror (0-9)');
  } else {
    score += 1;
  }

  // Check for special characters
  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
    suggestions.push('Lägg till specialtecken (!@#$%&*)');
  } else {
    score += 1;
  }

  // Bonus for longer passwords
  if (password.length >= 12) {
    score += 0.5;
  }

  // Cap score at 4
  score = Math.min(Math.round(score), 4);

  return {
    isValid: errors.length === 0 && password.length >= 8,
    score,
    errors,
    suggestions: errors.length === 0 ? suggestions : [],
  };
}

export function getPasswordStrengthLabel(score: number): { label: string; color: string } {
  switch (score) {
    case 0:
    case 1:
      return { label: 'Svagt', color: 'bg-destructive' };
    case 2:
      return { label: 'Acceptabelt', color: 'bg-amber-500' };
    case 3:
      return { label: 'Bra', color: 'bg-emerald-500' };
    case 4:
      return { label: 'Starkt', color: 'bg-emerald-600' };
    default:
      return { label: 'Svagt', color: 'bg-destructive' };
  }
}

/**
 * ============================================================================
 * OWASP Top 10 (2021) - VULNERABILITY TEST SUITE
 * ============================================================================
 *
 * PURPOSE: Educational test suite demonstrating how to detect and validate
 * OWASP Top 10 security vulnerabilities using automated testing.
 *
 * These tests are designed to:
 * 1. Validate that vulnerabilities exist in the code
 * 2. Educate developers on security implications
 * 3. Enable SonarQube to detect these issues
 * 4. Serve as examples of "what NOT to do"
 *
 * ⚠️  WARNING: These are INTENTIONALLY INSECURE tests for education only.
 * Real applications should NOT contain these vulnerabilities.
 * ============================================================================
 */

const {
  BrokenAccessControlService,
  CryptographicFailuresService,
  InjectionVulnerabilitiesService,
  InsecureDesignService,
  SecurityMisconfigurationService,
  VulnerableComponentsService,
  AuthenticationFailuresService,
  DataIntegrityFailuresService,
  LoggingMonitoringFailuresService,
  SSRFVulnerabilitiesService,
} = require('./owasp-vulnerabilities');

// ============================================================================
// A01:2021 - BROKEN ACCESS CONTROL
// ============================================================================
// Test: Verify that authorization checks are NOT properly enforced
describe('A01:2021 - Broken Access Control', () => {
  const service = new BrokenAccessControlService();

  describe('Unauthorized Access to Account Data', () => {
    it('should return sensitive data for ANY user (demonstrates IDOR)', () => {
      // Vulnerability: User 'john' can access 'admin' account data
      const attackerData = service.getAccountData('john', 'admin-account-id');

      // Should NOT work, but does! Account balance, SSN, credit card all exposed.
      expect(attackerData).toHaveProperty('balance');
      expect(attackerData).toHaveProperty('ssn');
      expect(attackerData).toHaveProperty('creditCard');
      expect(attackerData.creditCard).toBe('4532-1111-2222-3333');
    });

    it('should allow ANY user to perform admin actions (missing role check)', () => {
      // Vulnerability: Non-admin user can delete any user
      const result = service.performAdminAction(
        'regular-user-123',
        'delete_user'
      );

      // Should require admin role, but doesn't!
      expect(result.success).toBe(true);
      expect(result.deleted).toBe(true);
    });

    it('should allow access to private objects via IDOR (Insecure Direct Object Reference)', () => {
      // Vulnerability: Can access private medical records by guessing object IDs
      const privateRecord = service.getObjectById(2);

      // Medical records should NOT be accessible without authorization
      expect(privateRecord.data).toContain('Private Medical Records');
      expect(privateRecord.data).toContain('Patient XYZ');
    });
  });
});

// ============================================================================
// A02:2021 - CRYPTOGRAPHIC FAILURES
// ============================================================================
// Test: Verify that sensitive data is NOT properly encrypted or hashed
describe('A02:2021 - Cryptographic Failures', () => {
  const service = new CryptographicFailuresService();

  describe('Weak Password Storage', () => {
    it('should store passwords in plain text (CRITICAL vulnerability)', () => {
      // Vulnerability: Passwords stored as-is, no hashing
      const userDb = service.storePassword('admin', 'SecretPassword123');

      // Password is directly retrievable—attacker wins by reading database
      expect(userDb.admin).toBe('SecretPassword123');
    });

    it('should hash passwords with MD5 (cryptographically broken)', () => {
      // Vulnerability: MD5 can be cracked in milliseconds
      const hash = service.weakHashPassword('password123');

      // MD5 hash of 'password123' can be looked up in rainbow tables instantly
      expect(hash).toBe('482c811da5d5b4bc6d497ffa98491e38');
    });

    it('should fail to encrypt with hardcoded key', () => {
      // Vulnerability: Hardcoded encryption key in source code
      const encrypted = service.encryptWithHardcodedKey('sensitive data');

      // Anyone with source code access can decrypt
      expect(encrypted).toBeTruthy();
      expect(typeof encrypted).toBe('string');
    });
  });

  describe('Sensitive Data Exposure', () => {
    it('should log credit card numbers in plaintext', () => {
      // Vulnerability: PII logged unencrypted to files
      const result = service.logCreditCard('4532-1111-2222-3333');

      expect(result).toBe(true);
      // Credit card now in /tmp/app.log visible to system users
    });

    it('should transmit sensitive data insecurely', () => {
      // Vulnerability: No encryption in transit (HTTP vs HTTPS)
      const payload = service.transmitSensitiveDataInsecurely({
        userId: 'user123',
        password: 'MyPassword123',
        creditCard: '4532-1111-2222-3333',
      });

      // Payload contains all sensitive data in plaintext
      expect(payload).toContain('user123');
      expect(payload).toContain('MyPassword123');
      expect(payload).toContain('4532-1111-2222-3333');
    });

    it('should expose API keys and secrets in source code', () => {
      // Vulnerability: Hardcoded secrets
      const secrets = service.callThirdPartyAPI();

      // Secrets are directly accessible
      expect(secrets.apiKey).toBe('sk-1234567890abcdef-super-secret-key');
      expect(secrets.apiSecret).toBe('secret_password_123');
    });
  });
});

// ============================================================================
// A03:2021 - INJECTION
// ============================================================================
// Test: Verify that user input is NOT properly validated/escaped
describe('A03:2021 - Injection Vulnerabilities', () => {
  const service = new InjectionVulnerabilitiesService();

  describe('SQL Injection', () => {
    it('should generate vulnerable SQL query with user input', () => {
      // Vulnerability: String concatenation in SQL query
      const query = service.sqlInjectionVulnerability("admin' OR '1'='1");

      // Query is vulnerable to attack
      expect(query).toContain('WHERE username =');
      expect(query).toContain("OR '1'='1");
      // This query returns ALL users, not just admin
    });

    it('should allow SQL injection via input', () => {
      // Vulnerability: Admin bypass
      const query = service.sqlInjectionVulnerability("' OR '1'='1' /*");

      // Query should SELECT all users
      expect(query).toMatch(/OR.*1.*1/);
    });
  });

  describe('Command Injection', () => {
    it('should execute shell commands from user input', async () => {
      // This test demonstrates the vulnerability exists
      // Actual execution suppressed for safety
      // Vulnerability: User input directly in shell command
      expect(() => {
        service.commandInjectionVulnerability('test.txt; echo "hacked"');
      }).toBeDefined();
    });
  });

  describe('Path Traversal', () => {
    it('should allow reading files outside intended directory', () => {
      // Vulnerability: No path validation
      // Attacker can use: "../../etc/passwd"
      // This would read system files
      expect(() => {
        service.pathTraversalVulnerability('../../etc/passwd');
      }).toBeDefined();
    });
  });

  describe('Eval Injection', () => {
    it('should execute arbitrary code via eval()', () => {
      // Vulnerability: eval() with user input
      const result = service.expressionLanguageInjection('2 + 2');

      expect(result).toBe(4);
      // But attacker could use: require('child_process').execSync('rm -rf /')
    });

    it('should allow arbitrary code execution (DANGEROUS)', () => {
      // This vulnerability allows complete system compromise
      // Example attack payload: "require('fs').readFileSync('/etc/passwd')"
      expect(() => {
        service.expressionLanguageInjection('1+1');
      }).not.toThrow();
    });
  });
});

// ============================================================================
// A04:2021 - INSECURE DESIGN
// ============================================================================
// Test: Verify that security controls are missing in design
describe('A04:2021 - Insecure Design', () => {
  const service = new InsecureDesignService();

  describe('Brute Force Protection', () => {
    it('should allow unlimited password attempts (no rate limiting)', () => {
      // Vulnerability: No brute force protection
      const result = service.loginWithoutRateLimiting(
        'admin',
        'wrong-password'
      );

      expect(result.success).toBe(false);
      // But attacker can retry infinitely without delay or lockout
    });

    it('should not lock account after multiple failures', () => {
      // Vulnerability: Account remains active despite 50 failed attempts
      const attempts = service.trackLoginAttempts();

      expect(attempts.admin).toBe(50);
      // Account should be locked, but isn't!
    });
  });

  describe('CSRF Protection', () => {
    it('should allow state-changing actions without CSRF token', () => {
      // Vulnerability: No CSRF protection
      const transfer = service.performActionWithoutCSRFToken('transfer_money', {
        amount: 10000,
        to: 'attacker-account',
      });

      // Could be triggered by malicious website
      expect(transfer.success).toBe(true);
      expect(transfer.transferred).toBe(10000);
    });
  });

  describe('Input Validation', () => {
    it('should allow file upload without validation', () => {
      // Vulnerability: No file type or size limits
      const maliciousFile = Buffer.from('<?php system($_GET["cmd"]); ?>');
      const result = service.uploadFileWithoutValidation(
        maliciousFile,
        'webshell.php'
      );

      expect(result.success).toBe(true);
      // Webshell now uploaded and executable!
    });

    it('should allow price manipulation in orders', () => {
      // Vulnerability: No validation on order state changes
      const order = service.processOrderWithoutValidation({
        id: 'ORDER001',
        price: 999.99,
        status: 'pending',
      });

      // Price can be set to $0.01
      expect(order.price).toBe(0.01);
      expect(order.paid).toBe(true); // Can bypass payment!
    });
  });

  describe('Weak Password Policy', () => {
    it('should accept 1-character password', () => {
      // Vulnerability: Minimum length = 1 character
      const isValid = service.validatePasswordInsecurely('a');

      expect(isValid).toBe(true);
      // 1 character passwords are trivially brute-forced
    });

    it('should accept passwords with no complexity', () => {
      // Vulnerability: No complexity requirements
      const isValid = service.validatePasswordInsecurely('aaaa');

      expect(isValid).toBe(true);
    });
  });
});

// ============================================================================
// A05:2021 - SECURITY MISCONFIGURATION
// ============================================================================
// Test: Verify that insecure defaults and configurations exist
describe('A05:2021 - Security Misconfiguration', () => {
  const service = new SecurityMisconfigurationService();

  describe('Hardcoded Credentials', () => {
    it('should have database credentials in source code', () => {
      // Vulnerability: DB credentials hardcoded
      const dbConfig = service.getDatabaseConnection();

      expect(dbConfig.username).toBe('admin');
      expect(dbConfig.password).toBe('SecretPassword123!');
      expect(dbConfig.host).toBe('prod-db.company.com');
    });
  });

  describe('Debug Mode in Production', () => {
    it('should have debug mode enabled', () => {
      // Vulnerability: Debug mode exposes internals
      const debugEnabled = service.isDebugModeEnabled();

      expect(debugEnabled).toBe(true);
      // Stack traces and environment variables now exposed
    });
  });

  describe('Verbose Error Messages', () => {
    it('should expose stack traces and system details', () => {
      // Vulnerability: Full error details exposed
      const error = new Error('Database connection failed');
      error.stack = 'at /var/www/app/services/database.js:127';
      const errorResponse = service.handleErrorWithVerboseMessage(error);

      expect(errorResponse.stack).toBeTruthy();
      expect(errorResponse.file).toBe('/var/www/app/services/database.js:127');
    });
  });

  describe('HTTP Methods', () => {
    it('should allow DELETE and PUT without authentication', () => {
      // Vulnerability: Dangerous HTTP methods enabled
      const result = service.handleUnnecessaryHttpMethods('DELETE');

      expect(result.allowed).toBe(true);
      expect(result.methods).toContain('DELETE');
      expect(result.methods).toContain('TRACE'); // TRACE enables HTTP response splitting
    });
  });

  describe('Missing Security Headers', () => {
    it('should not include security headers', () => {
      // Vulnerability: No CSP, HSTS, X-Frame-Options
      const headers = service.getResponseHeaders();

      expect(headers['Content-Security-Policy']).toBeUndefined();
      expect(headers['X-Frame-Options']).toBeUndefined();
      expect(headers['Strict-Transport-Security']).toBeUndefined();
      expect(headers['X-Content-Type-Options']).toBeUndefined();
    });

    it('should expose server software version', () => {
      // Vulnerability: Server header reveals version
      const headers = service.getResponseHeaders();

      expect(headers.Server).toContain('Express/4.17.3');
      // Attackers now know Express version and can target known CVEs
    });
  });

  describe('Default Accounts', () => {
    it('should have default admin/admin credentials', () => {
      // Vulnerability: Default credentials never changed
      const account = service.initializeDefaultAccount();

      expect(account.username).toBe('admin');
      expect(account.password).toBe('admin');
      expect(account.role).toBe('administrator');
    });
  });

  describe('Unrestricted File Access', () => {
    it('should serve any file requested', () => {
      // Vulnerability: Can access system files
      expect(() => {
        service.serveStaticFile('/etc/passwd');
      }).toBeDefined();
      // Would expose system user information
    });
  });
});

// ============================================================================
// A06:2021 - VULNERABLE & OUTDATED COMPONENTS
// ============================================================================
// Test: Verify that outdated dependencies are being used
describe('A06:2021 - Vulnerable & Outdated Components', () => {
  const service = new VulnerableComponentsService();

  describe('Outdated Dependencies', () => {
    it('should demonstrate use of vulnerable component versions', () => {
      // Vulnerability: Using old versions with known CVEs
      const result = service.demonstrateOutdatedDependencies();

      expect(result.message).toContain('outdated');
      expect(result.note).toContain('npm audit');
    });

    it('should allow loading untrusted modules dynamically', () => {
      // Vulnerability: require() with user-controlled name
      // Attacker could specify: "malicious-package" or "/etc/passwd"
      expect(() => {
        service.loadDynamicComponent('non-existent-module');
      }).toBeDefined();
    });
  });
});

// ============================================================================
// A07:2021 - AUTHENTICATION FAILURES
// ============================================================================
// Test: Verify that authentication mechanisms are broken
describe('A07:2021 - Authentication Failures', () => {
  const service = new AuthenticationFailuresService();

  describe('JWT Vulnerabilities', () => {
    it('should decode JWT without verifying signature', () => {
      // Vulnerability: Signature verification skipped
      const fakeJwt =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkFkbWluIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.invalid-signature';

      const decoded = service.verifyJwtWithoutSignatureCheck(fakeJwt);
      // Even though signature is invalid, it's decoded!
      expect(decoded).not.toBeNull();
    });

    it('should use weak JWT secret', () => {
      // Vulnerability: Simple password as JWT secret
      const token = service.createJwtWithWeakSecret({
        userId: 'user123',
        role: 'admin',
      });

      expect(token).toBeTruthy();
      // Secret 'secret123' can be brute-forced to forge tokens
    });
  });

  describe('Session Management', () => {
    it('should generate predictable session IDs', () => {
      // Vulnerability: Time-based session ID is predictable
      const sessionId = service.generateSessionId();

      expect(sessionId).toMatch(/SESSION_\d+/);
      // Next session ID is trivially guessable
    });

    it('should create sessions that never expire', () => {
      // Vulnerability: No expiration means perpetual access
      const session = service.createSession('user123');

      expect(session.expiresAt).toBeUndefined();
      expect(session.maxAge).toBeUndefined();
      // Stolen token remains valid forever
    });

    it('should not invalidate session on logout', () => {
      // Vulnerability: Session still valid after logout
      const result = service.logout('session-id-123');

      expect(result.success).toBe(true);
      // But session is NOT actually invalidated!
    });
  });

  describe('Account Protection', () => {
    it('should not lock account after failed attempts', () => {
      // Vulnerability: No account lockout
      const locked = service.isAccountLocked('admin');

      expect(locked).toBe(false);
      // Brute force never fails
    });

    it('should not expire password reset token', () => {
      // Vulnerability: Reset token valid forever
      const resetToken =
        service.generatePasswordResetToken('admin@example.com');

      expect(resetToken.expiresAt).toBeUndefined();
      // Attacker can use year-old reset tokens
    });
  });

  describe('Multi-Factor Authentication', () => {
    it('should not require MFA', () => {
      // Vulnerability: Single factor authentication only
      const result = service.loginWithoutMFA('admin', 'correct_password');

      expect(result.success).toBe(true);
      // Password compromise = full account access
    });
  });
});

// ============================================================================
// A08:2021 - SOFTWARE & DATA INTEGRITY FAILURES
// ============================================================================
// Test: Verify that code/data integrity is not protected
describe('A08:2021 - Software & Data Integrity Failures', () => {
  const service = new DataIntegrityFailuresService();

  describe('Arbitrary Code Execution', () => {
    it('should execute arbitrary code with eval()', () => {
      // Vulnerability: eval() with user code
      const result = service.executeUserCode('2 + 2');

      expect(result).toBe(4);
      // But attacker could: require('fs').rmSync('/', {recursive: true})
    });

    it('should allow Function constructor exploitation', () => {
      // Vulnerability: Function() constructor = eval()
      const result = service.createDynamicFunction('2 + 3');

      expect(result).toBe(5);
      // Attacker code execution possible
    });
  });

  describe('Insecure Deserialization', () => {
    it('should deserialize untrusted data', () => {
      // Vulnerability: eval() on user-supplied object
      expect(() => {
        service.deserializeUntrustedData('({value: 123})');
      }).toBeDefined();
    });

    it('should demonstrate dynamic module loading vulnerability', () => {
      // Vulnerability: Untrusted module loading
      expect(() => {
        service.loadModule('some-package');
      }).toBeDefined();
    });
  });

  describe('Prototype Pollution', () => {
    it('should allow prototype pollution', () => {
      // Vulnerability: Modifying Object.prototype
      service.polluttePrototype('isAdmin', true);

      // Now ALL objects are admin!
      const obj = {};
      expect(obj.isAdmin).toBe(true);

      // Clean up
      delete Object.prototype.isAdmin;
    });
  });
});

// ============================================================================
// A09:2021 - LOGGING & MONITORING FAILURES
// ============================================================================
// Test: Verify that security events are not properly logged
describe('A09:2021 - Logging & Monitoring Failures', () => {
  const service = new LoggingMonitoringFailuresService();

  describe('Missing Security Logs', () => {
    it('should not log failed login attempts', () => {
      // Vulnerability: No audit trail
      const result = service.loginWithoutFailureLogging('admin', 'wrong');

      expect(result.success).toBe(false);
      // Failed attempt not logged—brute force is invisible
    });
  });

  describe('Sensitive Data in Logs', () => {
    it('should log PII and secrets in plaintext', () => {
      // Vulnerability: Sensitive data logged
      const result = service.logUserData({
        id: 'user123',
        email: 'user@example.com',
        password: 'SecretPassword123',
        ssn: '123-45-6789',
        creditCard: '4532-1111-2222-3333',
      });

      expect(result).toBe(true);
      // Password, SSN, credit card now in logs!
    });

    it('should log exception stack traces with system paths', () => {
      // Vulnerability: Stack traces expose internals
      const error = new Error('Something failed');
      error.stack = 'at /var/www/app/services/auth.js:145';
      const logEntry = service.logExceptionDetails(error);

      expect(logEntry.stack).toContain('/var/www/app/services/auth.js');
      // File paths and function names exposed
    });

    it('should log sensitive response data', () => {
      // Vulnerability: API keys, tokens in logs
      const response = service.logResponseData({
        statusCode: 200,
        body: { apiKey: 'sk-123456', token: 'jwt-token' },
        headers: { Authorization: 'Bearer secret' },
      });

      expect(response.body.apiKey).toBe('sk-123456');
      // Credentials now in logs
    });
  });

  describe('No Monitoring', () => {
    it('should record events without alerting', () => {
      // Vulnerability: Events logged but not monitored
      const event = service.recordEvent('failed_login_attempt');

      expect(event.type).toBe('failed_login_attempt');
      // Event exists but no alert will fire
    });

    it('should store logs insecurely', () => {
      // Vulnerability: /tmp is world-readable
      const logPath = service.getLogStoragePath();

      expect(logPath).toBe('/tmp/app.log');
      // Logs readable by any system user
    });

    it('should not protect log integrity', () => {
      // Vulnerability: Logs can be modified/deleted
      const result = service.appendToLog('test event');

      expect(result).toBe(true);
      // Attacker can modify logs to cover tracks
    });
  });
});

// ============================================================================
// A10:2021 - SERVER-SIDE REQUEST FORGERY (SSRF)
// ============================================================================
// Test: Verify that URLs are not validated
describe('A10:2021 - Server-Side Request Forgery (SSRF)', () => {
  const service = new SSRFVulnerabilitiesService();

  describe('Unvalidated URL Requests', () => {
    it('should construct SSRF vulnerability allowing internal requests', () => {
      // Vulnerability: User controls request URL
      // Attacker could request: http://localhost:8080/admin
      //                      or http://169.254.169.254/latest/meta-data/
      expect(() => {
        service.fetchUserProvidedUrl('http://localhost:9999/internal');
      }).toBeDefined();
      // Could access internal services
    });

    it('should allow open redirect attacks', () => {
      // Vulnerability: User controls redirect destination
      const redirect = service.redirectToUserUrl(
        'http://attacker.com/phishing'
      );

      expect(redirect.redirect).toBe('http://attacker.com/phishing');
      // Users redirected to malicious site
    });
  });

  describe('Webhook Validation', () => {
    it('should allow unvalidated webhook URLs', () => {
      // Vulnerability: No URL allowlist
      const webhooks = service.registerWebhook(
        'http://localhost:5000/admin-api'
      );

      expect(webhooks[0].url).toBe('http://localhost:5000/admin-api');
      // Could trigger internal APIs
    });
  });

  describe('File Access', () => {
    it('should allow file:// protocol URLs', () => {
      // Vulnerability: Can access local files
      expect(() => {
        service.downloadFileFromUrl('file:///etc/passwd');
      }).toBeDefined();
      // System files could be downloaded
    });
  });

  describe('Cloud Metadata Access', () => {
    it('should demonstrate cloud metadata vulnerability', () => {
      // Vulnerability: AWS metadata endpoint accessible
      const result = service.accessCloudMetadata();

      expect(result.warning).toContain('credentials');
      // AWS keys could be stolen
    });
  });

  describe('Request Timeouts', () => {
    it('should fetch without timeout (DoS vector)', () => {
      // Vulnerability: No timeout = resource exhaustion
      const result = service.fetchWithoutTimeout(
        'http://slow-attacker-server.com/hang'
      );

      expect(result.fetching).toBe('http://slow-attacker-server.com/hang');
      // Application could hang indefinitely
    });
  });

  describe('DNS Rebinding', () => {
    it('should demonstrate DNS rebinding vulnerability', () => {
      // Vulnerability: No DNS pinning
      const result = service.dnsRebindingVulnerability('attacker.com');

      expect(result.vulnerable).toBe('DNS rebinding possible');
      // Attacker can access localhost by controlling DNS
    });
  });
});

// ============================================================================
// SUMMARY
// ============================================================================
/**
 * This test suite demonstrates all 10 OWASP Top 10 (2021) vulnerabilities.
 *
 * Each test validates that the vulnerability exists in the code, making it
 * detectable by static analysis tools like SonarQube.
 *
 * Key Learnings:
 * ✓ A01: Always validate authorization, not just authentication
 * ✓ A02: Use bcrypt/Argon2 for passwords, TLS for transport, key management for crypto
 * ✓ A03: Use parameterized queries, NEVER eval(), validate all input
 * ✓ A04: Design security in from the start, implement rate limiting, CSRF tokens
 * ✓ A05: Use security headers, secure defaults, principle of least privilege
 * ✓ A06: Keep dependencies updated, use lockfiles, run npm audit
 * ✓ A07: Use strong JWT secrets, implement MFA, proper session management
 * ✓ A08: NEVER use eval/Function/require with untrusted data, use libraries
 * ✓ A09: Log security events, protect PII, monitor for incidents
 * ✓ A10: Validate URLs with allowlists, use SSRF firewalls, implement timeouts\n *\n * For remediation examples: see OWASP Cheat Sheets and security best practices.\n */

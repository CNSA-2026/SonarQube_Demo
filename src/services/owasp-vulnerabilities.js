/**
 * ============================================================================
 * OWASP Top 10 (2021) - INTENTIONAL VULNERABILITIES FOR SECURITY TESTING
 * ============================================================================
 *
 * PURPOSE: Educational demonstration of classic security vulnerabilities
 * for testing SonarQube detection capabilities and security awareness training.
 *
 * ⚠️  WARNING: This file contains intentionally vulnerable code.
 * DO NOT use any patterns from this file in production code.
 *
 * SonarQube should detect and flag ALL of these vulnerabilities.
 * ============================================================================
 */

const crypto = require('crypto');
const fs = require('fs');
const os = require('os');
const { exec } = require('child_process');
const https = require('https');

// Mock JWT for educational purposes if not installed
let jwt;
try {
  jwt = require('jsonwebtoken');
} catch (e) {
  // Provide mock jwt functions for testing without external dependency
  jwt = {
    decode: (token) => {
      try {
        return JSON.parse(
          Buffer.from(token.split('.')[1], 'base64').toString()
        );
      } catch {
        return null;
      }
    },
    sign: (payload, secret) => {
      // Simple mock JWT: header.payload.signature
      const header = Buffer.from(
        JSON.stringify({ alg: 'HS256', typ: 'JWT' })
      ).toString('base64');
      const body = Buffer.from(JSON.stringify(payload)).toString('base64');
      const signature = Buffer.from(secret).toString('base64');
      return `${header}.${body}.${signature}`;
    },
  };
}

// ============================================================================
// A01:2021 - BROKEN ACCESS CONTROL
// ============================================================================
// Risk: Unauthorized users can access restricted resources without proper
// authorization checks. No role-based access control (RBAC) implemented.
// Severity: CRITICAL
// Remediation: Implement middleware for authentication & authorization checks

class BrokenAccessControlService {
  /**
   * A01 Vulnerability: No authorization check on sensitive operations
   * @param {string} userId - User requesting access
   * @param {string} accountId - Account to access
   * @returns {object} Sensitive account data without verification
   */
  getAccountData(userId, accountId) {
    // ❌ VULNERABILITY: No check if userId owns accountId
    // Any authenticated user can access ANY account
    const accountData = {
      accountId: accountId,
      balance: 50000,
      ssn: '123-45-6789',
      creditCard: '4532-1111-2222-3333',
      accountHolder: 'John Doe',
    };
    return accountData;
  }

  /**
   * A01 Vulnerability: Admin operations without role verification
   * @param {string} userId - User executing admin action
   * @param {string} action - Admin action (delete, modify, etc)
   */
  performAdminAction(userId, action) {
    // ❌ VULNERABILITY: No verification that userId is actually an admin
    if (action === 'delete_user') {
      return { success: true, deleted: true };
    }
    if (action === 'modify_permissions') {
      return { success: true, modified: true };
    }
    return { success: false };
  }

  /**
   * A01 Vulnerability: Direct object reference without authorization
   * @param {number} objectId - Object to retrieve
   */
  getObjectById(objectId) {
    // ❌ VULNERABILITY: IDOR - Insecure Direct Object Reference
    // User can request any objectId and get it without ownership verification
    const objects = {
      1: { data: 'Public Document' },
      2: { data: 'Private Medical Records - Patient XYZ' },
      3: { data: 'Confidential Business Strategy' },
      100: { data: 'Admin Internal Report' },
    };
    return objects[objectId] || null;
  }
}

// ============================================================================
// A02:2021 - CRYPTOGRAPHIC FAILURES
// ============================================================================
// Risk: Sensitive data exposed due to weak or missing encryption,
// hardcoded secrets, inadequate password hashing.
// Severity: CRITICAL
// Remediation: Use strong encryption (AES-256), bcrypt/Argon2 for passwords,
// secure key management with environment variables

class CryptographicFailuresService {
  /**
   * A02 Vulnerability: Passwords stored in plain text
   * @param {string} username - Username
   * @param {string} password - Password to store
   */
  storePassword(username, password) {
    // ❌ VULNERABILITY: Plain text password storage
    // No hashing, no salt—trivial to compromise
    const userDatabase = {
      [username]: password, // Password stored as-is!
    };
    return userDatabase;
  }

  /**
   * A02 Vulnerability: Weak MD5 hashing (cryptographically broken)
   * @param {string} password - Password to hash
   */
  weakHashPassword(password) {
    // ❌ VULNERABILITY: MD5 is cryptographically broken
    // Can be cracked in milliseconds with rainbow tables
    return crypto.createHash('md5').update(password).digest('hex');
  }

  /**
   * A02 Vulnerability: Hardcoded encryption key
   * @param {string} sensitiveData - Data to encrypt
   */
  encryptWithHardcodedKey(sensitiveData) {
    // ❌ VULNERABILITY: Hardcoded key in source code
    // Anyone with access to source code can decrypt
    const hardcodedKey = 'my-secret-key-12345-exposed';
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipher('aes-256-cbc', hardcodedKey);
    let encrypted = cipher.update(sensitiveData, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
  }

  /**
   * A02 Vulnerability: Sensitive data in logs and debug output
   * @param {string} creditCard - Credit card number
   */
  logCreditCard(creditCard) {
    // ❌ VULNERABILITY: Sensitive PII logged unencrypted
    console.log(`[DEBUG] Processing payment for card: ${creditCard}`);
    fs.appendFileSync('/tmp/app.log', `Card processed: ${creditCard}\n`);
    return true;
  }

  /**
   * A02 Vulnerability: No HTTPS enforcement, transmitting over HTTP
   */
  transmitSensitiveDataInsecurely(data) {
    // ❌ VULNERABILITY: Data should be encrypted in transit
    // Using unencrypted HTTP = man-in-the-middle vulnerability
    const payload = JSON.stringify({
      userId: data.userId,
      password: data.password,
      creditCard: data.creditCard,
    });
    // In real scenario, this would send via HTTP without TLS
    return payload;
  }

  /**
   * A02 Vulnerability: Storing API keys and secrets in code
   */
  callThirdPartyAPI() {
    // ❌ VULNERABILITY: API keys hardcoded in source
    const apiKey = 'sk-1234567890abcdef-super-secret-key';
    const apiSecret = 'secret_password_123';
    // These credentials are now visible to anyone with source access
    return { apiKey, apiSecret };
  }
}

// ============================================================================
// A03:2021 - INJECTION (SQL, Command, Template, etc.)
// ============================================================================
// Risk: Untrusted data treated as executable code, leading to complete
// system compromise through SQL injection, command injection, etc.
// Severity: CRITICAL
// Remediation: Use parameterized queries, input validation, escape user input

class InjectionVulnerabilitiesService {
  /**
   * A03 Vulnerability: SQL Injection
   * @param {string} username - User-supplied username
   * @returns {string} Vulnerable SQL query
   */
  sqlInjectionVulnerability(username) {
    // ❌ VULNERABILITY: User input directly concatenated into SQL query
    // Attacker input: ' OR '1'='1' OR ' ' = '
    // Query becomes: SELECT * FROM users WHERE username = '' OR '1'='1' OR '' = ''
    // Result: All users exposed
    const query = `SELECT * FROM users WHERE username = '${username}'`;
    return query;
  }

  /**
   * A03 Vulnerability: NoSQL Injection
   * @param {string} userId - User-supplied ID
   */
  noSQLInjectionVulnerability(userId) {
    // ❌ VULNERABILITY: Unsanitized userId in MongoDB query
    // Attacker could inject: { $ne: null }
    // Query: { userId: { $ne: null } } returns ALL users
    const query = { userId: eval(userId) }; // Additional eval() vulnerability!
    return query;
  }

  /**
   * A03 Vulnerability: Command Injection
   * @param {string} filename - User-supplied filename
   * @returns {Promise<string>} File contents
   */
  commandInjectionVulnerability(filename) {
    // ❌ VULNERABILITY: User input in shell command without sanitization
    // Attacker input: "; rm -rf / #"
    // Executes: cat ""; rm -rf / #"
    return new Promise((resolve, reject) => {
      exec(`cat "${filename}"`, (error, stdout, stderr) => {
        if (error) reject(error);
        resolve(stdout);
      });
    });
  }

  /**
   * A03 Vulnerability: Path Traversal (Directory Traversal)
   * @param {string} userPath - User-supplied file path
   */
  pathTraversalVulnerability(userPath) {
    // ❌ VULNERABILITY: No validation on file path
    // Attacker input: "../../etc/passwd"
    // Reads system files outside intended directory
    const basePath = '/var/www/uploads/';
    const filePath = basePath + userPath; // No sanitization!
    return fs.readFileSync(filePath, 'utf8');
  }

  /**
   * A03 Vulnerability: Template Injection
   * @param {string} userTemplate - User-supplied template
   * @param {object} data - Data to render
   */
  templateInjectionVulnerability(userTemplate, data) {
    // ❌ VULNERABILITY: User-controlled template allows code execution
    // Attacker could inject dangerous template logic
    return eval(`\`${userTemplate}\``); // eval() with user input!
  }

  /**
   * A03 Vulnerability: Expression Language / OGNL Injection
   * @param {string} expression - User-supplied expression
   */
  expressionLanguageInjection(expression) {
    // ❌ VULNERABILITY: User input evaluated as code
    // In real Node.js: eval() with user data
    return eval(expression); // This will execute ANY JavaScript!
  }

  /**
   * A03 Vulnerability: XML External Entity (XXE) Injection
   * @param {string} xmlData - User-supplied XML
   */
  xxeInjectionVulnerability(xmlData) {
    // ❌ VULNERABILITY: XML parser with external entities enabled
    // Could read local files or cause denial of service
    const DOMParser = require('xmldom').DOMParser;
    const doc = new DOMParser({
      errorHandler: { fatalError: () => {} },
    }).parseFromString(xmlData);
    return doc.documentElement.getAttribute('data');
  }
}

// ============================================================================
// A04:2021 - INSECURE DESIGN
// ============================================================================
// Risk: Missing or ineffective control design, inadequate threat modeling,
// weak security requirements, or absence of security architecture.
// Severity: HIGH
// Remediation: Design security controls into requirements, use threat modeling

class InsecureDesignService {
  /**
   * A04 Vulnerability: No rate limiting on login attempts
   * @param {string} username - Username
   * @param {string} password - Password
   */
  loginWithoutRateLimiting(username, password) {
    // ❌ VULNERABILITY: No protection against brute force
    // Attacker can try unlimited password attempts
    const users = { admin: 'admin123', user: 'pass456' };
    if (users[username] === password) {
      return { success: true, token: 'some-token' };
    }
    return { success: false }; // No tracking of failed attempts
  }

  /**
   * A04 Vulnerability: No account lockout after failed attempts
   */
  trackLoginAttempts() {
    // ❌ VULNERABILITY: Failed attempts tracked but no lockout implemented
    const attempts = {
      admin: 50, // 50 failed attempts—but account still active!
      user: 1000, // 1000 attempts—account never locked!
    };
    return attempts;
  }

  /**
   * A04 Vulnerability: Missing CSRF token validation
   * @param {string} action - Action to perform
   * @param {object} data - Request data
   */
  performActionWithoutCSRFToken(action, data) {
    // ❌ VULNERABILITY: No CSRF token validation
    // Victim clicks malicious link, their browser executes unintended action
    if (action === 'transfer_money') {
      return { success: true, transferred: data.amount };
    }
    return { success: false };
  }

  /**
   * A04 Vulnerability: Missing input validation on file upload
   * @param {Buffer} fileBuffer - Uploaded file
   * @param {string} filename - Upload filename
   */
  uploadFileWithoutValidation(fileBuffer, filename) {
    // ❌ VULNERABILITY: No file type, size, or content validation
    // Attacker can upload: malware, webshells, scripts, huge files
    try {
      const uploadDir = '/tmp/'; // Use /tmp for test environment
      fs.writeFileSync(uploadDir + filename, fileBuffer);
      return { success: true, path: uploadDir + filename };
    } catch (error) {
      // In real scenario, would still expose error details
      return { success: false, error: error.message };
    }
  }

  /**
   * A04 Vulnerability: Missing validation on state transitions
   * @param {object} order - Order object
   */
  processOrderWithoutValidation(order) {
    // ❌ VULNERABILITY: No validation on order state
    // Attacker can: bypass payment, change price, skip shipping verification
    const updatedOrder = {
      ...order,
      status: 'shipped', // Set to shipped without payment!
      price: 0.01, // Price manipulation
      paid: true, // Mark as paid without proof
    };
    return updatedOrder;
  }

  /**
   * A04 Vulnerability: Weak password policy
   * @param {string} password - Password to validate
   */
  validatePasswordInsecurely(password) {
    // ❌ VULNERABILITY: Weak password policy allows trivial passwords
    // No minimum length, complexity, or checking against common passwords
    return password && password.length >= 1; // 1 character minimum!
  }
}

// ============================================================================
// A05:2021 - SECURITY MISCONFIGURATION
// ============================================================================
// Risk: Insecure default configurations, incomplete setups, open services,
// outdated software, verbose error messages, unnecessary features enabled.
// Severity: HIGH
// Remediation: Use security hardening, security checklists, minimal configs

class SecurityMisconfigurationService {
  /**
   * A05 Vulnerability: Hardcoded database credentials
   */
  getDatabaseConnection() {
    // ❌ VULNERABILITY: DB credentials hardcoded in source
    // Anyone viewing source code has database access
    const dbConfig = {
      host: 'prod-db.company.com',
      port: 5432,
      username: 'admin',
      password: 'SecretPassword123!',
      database: 'production_db',
    };
    return dbConfig;
  }

  /**
   * A05 Vulnerability: Debug mode enabled in production
   */
  isDebugModeEnabled() {
    // ❌ VULNERABILITY: Debug mode on in production
    // Leaks stack traces, environment variables, internal paths
    process.env.DEBUG_MODE = 'true';
    return true;
  }

  /**
   * A05 Vulnerability: Verbose error messages expose system details
   * @param {Error} error - Exception caught
   */
  handleErrorWithVerboseMessage(error) {
    // ❌ VULNERABILITY: Full stack trace and system paths exposed
    // Attacker learns: database structure, file paths, software versions
    const errorResponse = {
      message: error.message,
      stack: error.stack,
      db_query: 'SELECT * FROM users WHERE id = ...',
      file: '/var/www/app/services/database.js:127',
    };
    return errorResponse;
  }

  /**
   * A05 Vulnerability: Unnecessary HTTP methods enabled (HTTP OPTIONS)
   */
  handleUnnecessaryHttpMethods(method) {
    // ❌ VULNERABILITY: DELETE and PUT enabled without authentication
    // Attacker can: update data via PUT, delete via DELETE, enumerate via OPTIONS
    if (method === 'DELETE' || method === 'PUT' || method === 'TRACE') {
      return {
        allowed: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'TRACE', 'OPTIONS'],
      };
    }
    return { allowed: false };
  }

  /**
   * A05 Vulnerability: Security headers not set
   */
  getResponseHeaders() {
    // ❌ VULNERABILITY: Missing security headers
    // No CSP (Cross-Site Scripting protection)
    // No X-Frame-Options (clickjacking protection)
    // No HSTS (force HTTPS)
    // No X-Content-Type-Options (MIME sniffing)
    const headers = {
      'Content-Type': 'application/json',
      Server: 'Express/4.17.3', // ❌ Reveals software version
    };
    return headers;
  }

  /**
   * A05 Vulnerability: Default credentials not changed
   */
  initializeDefaultAccount() {
    // ❌ VULNERABILITY: Default admin account with known credentials
    // Common default: admin/admin, admin/password, root/root
    return {
      username: 'admin',
      password: 'admin', // Default password never changed!
      role: 'administrator',
    };
  }

  /**
   * A05 Vulnerability: Unrestricted file access
   */
  serveStaticFile(requestedPath) {
    // ❌ VULNERABILITY: Can serve system files, config files
    // Attacker can request: /etc/passwd, .env, config files
    return fs.readFileSync(requestedPath, 'utf8');
  }
}

// ============================================================================
// A06:2021 - VULNERABLE & OUTDATED COMPONENTS
// ============================================================================
// Risk: Using libraries, frameworks, dependencies with known vulnerabilities
// or outdated versions. See package.json for intentionally old versions.
// Severity: HIGH
// Remediation: Inventory components, monitor for vulnerabilities,
// update and patch regularly using npm audit

class VulnerableComponentsService {
  /**
   * A06 Note: This application intentionally includes vulnerable dependencies
   * (defined in package.json with outdated versions).
   *
   * Vulnerable packages in this demo:
   * - express: 4.17.3 (has known CVEs)
   * - supertest: 6.2.2 (outdated)
   * - jest: 27.5.1 (has known vulnerabilities)
   *
   * Real remediation: Update to latest versions, run `npm audit fix`
   */

  /**
   * A06 Note: Dynamically loading untrusted components
   * @param {string} componentName - Component to load
   */
  loadDynamicComponent(componentName) {
    // ❌ VULNERABILITY: Loading untrusted or uncontrolled modules
    // Attacker could inject malicious component name
    // require() would load and execute arbitrary code
    try {
      const component = require(componentName);
      return component;
    } catch (error) {
      return null;
    }
  }

  /**
   * A06 Warning: Using deprecated npm packages
   * Example: Old versions of lodash, moment, etc. known to have vulnerabilities
   */
  demonstrateOutdatedDependencies() {
    return {
      message: 'See package.json for intentionally outdated dependencies',
      note: 'Run: npm audit to identify known vulnerabilities',
    };
  }
}

// ============================================================================
// A07:2021 - AUTHENTICATION FAILURES
// ============================================================================
// Risk: Broken authentication mechanisms allowing attackers to compromise
// password, sessions, tokens, or other authentication factors.
// Severity: CRITICAL
// Remediation: Implement proper authentication, MFA, secure sessions, JWT verification

class AuthenticationFailuresService {
  /**
   * A07 Vulnerability: JWT token without signature verification
   * @param {string} token - JWT token
   */
  verifyJwtWithoutSignatureCheck(token) {
    // ❌ VULNERABILITY: Decoding JWT without verifying signature
    // Attacker can create fake JWT with any payload
    try {
      const decoded = jwt.decode(token); // No verification!
      return decoded;
    } catch (error) {
      return null;
    }
  }

  /**
   * A07 Vulnerability: Weak JWT secret
   * @param {string} payload - JWT payload
   */
  createJwtWithWeakSecret(payload) {
    // ❌ VULNERABILITY: Weak secret key = easily guessed or brute-forced
    const weakSecret = 'secret123'; // Simple password as JWT secret
    const token = jwt.sign(payload, weakSecret);
    return token;
  }

  /**
   * A07 Vulnerability: Session identifier predictable
   */
  generateSessionId() {
    // ❌ VULNERABILITY: Predictable session ID (sequential, time-based)
    // Attacker can guess other users' session IDs
    const timestamp = Date.now();
    const sessionId = 'SESSION_' + timestamp; // Trivially predictable!
    return sessionId;
  }

  /**
   * A07 Vulnerability: Session doesn't expire
   */
  createSession(userId) {
    // ❌ VULNERABILITY: Session has no expiration
    // Stolen token remains valid forever
    const session = {
      userId: userId,
      createdAt: new Date(),
      // NO expiresAt field!
      // NO maxAge!
      isValid: true,
    };
    return session;
  }

  /**
   * A07 Vulnerability: Session not invalidated on logout
   * @param {string} sessionId - Session to invalidate
   */
  logout(sessionId) {
    // ❌ VULNERABILITY: Session not actually invalidated
    // Token/cookie still works after logout
    console.log(`User logged out, session: ${sessionId}`);
    // Session record still exists and is valid!
    return { success: true };
  }

  /**
   * A07 Vulnerability: Multiple password failures don't lock account
   * @param {string} username - Username
   * @returns {boolean} Is account locked
   */
  isAccountLocked(username) {
    // ❌ VULNERABILITY: No account lockout mechanism
    // Brute force never fails
    return false; // Account is never locked
  }

  /**
   * A07 Vulnerability: Forgot password link never expires
   * @param {string} email - User email
   */
  generatePasswordResetToken(email) {
    // ❌ VULNERABILITY: Reset token never expires
    // Attacker can use old tokens to reset passwords
    const resetToken = {
      email: email,
      token: 'some-random-token-12345',
      // NO expiresAt!
      // NO maxAge!
      createdAt: new Date(),
    };
    return resetToken;
  }

  /**
   * A07 Vulnerability: No multi-factor authentication (MFA)
   * @param {string} username - Username
   * @param {string} password - Password
   */
  loginWithoutMFA(username, password) {
    // ❌ VULNERABILITY: Single factor authentication
    // If password is compromised, full account access is granted
    if (username === 'admin' && password === 'correct_password') {
      return { success: true, token: 'authenticated' };
    }
    return { success: false };
  }
}

// ============================================================================
// A08:2021 - SOFTWARE & DATA INTEGRITY FAILURES
// ============================================================================
// Risk: Code/data integrity violations: using untrusted repositories,
// insecure deserialization allowing arbitrary code execution, etc.
// Severity: HIGH
// Remediation: Use secure update mechanisms, verify libraries,
// avoid eval() and untrusted deserialization

class DataIntegrityFailuresService {
  /**
   * A08 Vulnerability: eval() with untrusted input - CRITICAL
   * @param {string} userCode - User-supplied code
   * @returns {*} Execution result
   */
  executeUserCode(userCode) {
    // ❌ VULNERABILITY: Arbitrary code execution
    // Attacker input: "require('fs').unlinkSync('/etc/important_file')"
    // RESULT: System file deleted!
    return eval(userCode);
  }

  /**
   * A08 Vulnerability: Object deserialization without validation
   * @param {string} serializedData - Serialized object
   */
  deserializeUntrustedData(serializedData) {
    // ❌ VULNERABILITY: Deserializing untrusted data
    // In Node.js: eval on JSON from user = code execution
    const data = eval(`(${serializedData})`);
    return data;
  }

  /**
   * A08 Vulnerability: Pickle/YAML deserialization (if available)
   * @param {Buffer} pickledData - Pickled Python object
   */
  deserializePythonObject(pickledData) {
    // ❌ VULNERABILITY: If using insecure deserialization library
    // Untrusted serialized data can execute arbitrary code
    // Note: This is more common in Python apps, but shown for awareness
    return { warning: 'Never deserialize untrusted Pickle or YAML data' };
  }

  /**
   * A08 Vulnerability: Dynamic module loading without verification
   * @param {string} moduleName - Module name to load
   */
  loadModule(moduleName) {
    // ❌ VULNERABILITY: Loading untrusted modules
    // Attacker could load malicious npm package
    try {
      return require(moduleName);
    } catch (e) {
      return null;
    }
  }

  /**
   * A08 Vulnerability: Using Function constructor with user input
   * @param {string} userFunction - Function body
   */
  createDynamicFunction(userFunction) {
    // ❌ VULNERABILITY: Function constructor with untrusted code
    // Equivalent to eval()
    const userFunc = new Function('return ' + userFunction);
    return userFunc();
  }

  /**
   * A08 Vulnerability: Modifying object prototype (prototype pollution)
   * @param {string} key - Object key
   * @param {*} value - Value to set
   */
  polluttePrototype(key, value) {
    // ❌ VULNERABILITY: Modifying Object.prototype
    // Affects all objects in application
    Object.prototype[key] = value;
    return { success: true };
  }

  /**
   * A08 Vulnerability: No code signing verification
   */
  loadCodeFromExternalSource() {
    // ❌ VULNERABILITY: Loading code without verifying signature
    // Attacker could perform MITM attack or compromise source
    // Missing: GPG signature verification, checksum validation
    return { warning: 'Code downloaded without integrity verification' };
  }
}

// ============================================================================
// A09:2021 - LOGGING & MONITORING FAILURES
// ============================================================================
// Risk: Failure to log security events, inadequate monitoring, alerts, etc.
// Could allow attackers to go undetected, cover tracks, attack without discovery.
// Severity: MEDIUM
// Remediation: Log security events, implement alerts, centralize logging,
// monitor for suspicious patterns

class LoggingMonitoringFailuresService {
  /**
   * A09 Vulnerability: No logging of failed login attempts
   * @param {string} username - Username
   * @param {string} password - Password
   */
  loginWithoutFailureLogging(username, password) {
    // ❌ VULNERABILITY: No audit log for failed attempts
    // Brute force attack is invisible
    if (username === 'admin' && password === 'correct') {
      return { success: true };
    }
    // Failed attempt not logged!
    return { success: false };
  }

  /**
   * A09 Vulnerability: Sensitive data in logs
   * @param {object} user - User object
   */
  logUserData(user) {
    // ❌ VULNERABILITY: PII and secrets logged unencrypted
    const logEntry = `User logged in: ${JSON.stringify({
      id: user.id,
      email: user.email,
      password: user.password, // ❌ Password in plaintext logs!
      ssn: user.ssn, // ❌ SSN in plaintext logs!
      creditCard: user.creditCard, // ❌ Credit card in logs!
    })}`;
    fs.appendFileSync('/tmp/app.log', logEntry + '\n');
    return true;
  }

  /**
   * A09 Vulnerability: Exception details logged without sanitization
   * @param {Error} error - Exception
   */
  logExceptionDetails(error) {
    // ❌ VULNERABILITY: Full stack trace reveals internals
    const logEntry = {
      timestamp: new Date(),
      error: error.message,
      stack: error.stack, // Reveals file paths, line numbers, function names
      query: 'SELECT * FROM users WHERE id = ...', // SQL revealing schema
      user_id: '12345',
    };
    console.error(JSON.stringify(logEntry));
    return logEntry;
  }

  /**
   * A09 Vulnerability: No monitoring of security events
   * @param {string} eventType - Type of event
   */
  recordEvent(eventType) {
    // ❌ VULNERABILITY: Events generated but not monitored
    // No alerts for: multiple failed logins, privilege escalation,
    // data exports, admin actions, etc.
    const event = {
      type: eventType,
      timestamp: new Date(),
      // Event recorded to a log file that nobody reads
    };
    fs.appendFileSync('/tmp/events.log', JSON.stringify(event) + '\n');
    // No one will alert on suspicious patterns!
    return event;
  }

  /**
   * A09 Vulnerability: Logs stored insecurely
   */
  getLogStoragePath() {
    // ❌ VULNERABILITY: Logs stored in world-readable /tmp
    // Logs not encrypted, not rotated, not protected
    return '/tmp/app.log';
  }

  /**
   * A09 Vulnerability: No log integrity verification
   */
  appendToLog(message) {
    // ❌ VULNERABILITY: Logs can be modified or deleted by attacker
    // No WORM (Write Once Read Many) storage
    // No cryptographic protection
    fs.appendFileSync('/tmp/app.log', message + '\n');
    return true;
  }

  /**
   * A09 Vulnerability: Response logging without sanitization
   * @param {object} response - HTTP response
   */
  logResponseData(response) {
    // ❌ VULNERABILITY: Sensitive response data logged
    const logEntry = {
      statusCode: response.statusCode,
      body: response.body, // Might contain APIs keys, tokens, passwords
      headers: response.headers, // Might contain Authorization, Set-Cookie
    };
    console.log(JSON.stringify(logEntry));
    return logEntry;
  }
}

// ============================================================================
// A10:2021 - SERVER-SIDE REQUEST FORGERY (SSRF)
// ============================================================================
// Risk: Web application can make requests to unintended servers
// (internal systems, cloud metadata services, local services).
// Severity: HIGH
// Remediation: Validate all URLs, use allowlists, disable unused features,
// firewall internal services, avoid user-controlled redirect URLs

class SSRFVulnerabilitiesService {
  /**
   * A10 Vulnerability: Fetching user-supplied URL without validation
   * @param {string} url - URL to fetch
   * @returns {Promise<string>} Response body
   */
  fetchUserProvidedUrl(url) {
    // ❌ VULNERABILITY: SSRF - Can access internal services
    // Attacker input: "http://localhost:8080/admin"
    //              or "http://169.254.169.254/latest/meta-data/" (AWS metadata)
    //              or "http://internal-database:5432"
    return new Promise((resolve, reject) => {
      https
        .get(url, (res) => {
          let data = '';
          res.on('data', (chunk) => (data += chunk));
          res.on('end', () => resolve(data));
        })
        .on('error', reject);
    });
  }

  /**
   * A10 Vulnerability: Open redirect (related to SSRF)
   * @param {string} redirectUrl - URL to redirect to
   */
  redirectToUserUrl(redirectUrl) {
    // ❌ VULNERABILITY: Open redirect
    // Attacker can redirect users to malicious site
    // Input: "http://attacker.com/phishing"
    return { redirect: redirectUrl };
  }

  /**
   * A10 Vulnerability: No allowlist on webhook URLs
   * @param {string} webhookUrl - Webhook destination URL
   */
  registerWebhook(webhookUrl) {
    // ❌ VULNERABILITY: Webhook URL not validated
    // Attacker could register: "http://localhost:9999/internal-api"
    const webhooks = [{ url: webhookUrl, enabled: true }];
    return webhooks;
  }

  /**
   * A10 Vulnerability: File upload URL not validated
   * @param {string} fileUrl - URL to download file from
   */
  downloadFileFromUrl(fileUrl) {
    // ❌ VULNERABILITY: Can access local file:// URLs
    // Attacker input: "file:///etc/passwd"
    // Result: /etc/passwd downloaded and exposed
    return https.get(fileUrl, (res) => {
      return res;
    });
  }

  /**
   * A10 Vulnerability: Accessing AWS metadata service
   */
  accessCloudMetadata() {
    // ❌ VULNERABILITY: Cloud metadata service exposed
    // http://169.254.169.254/latest/meta-data/
    // Attacker gains: AWS credentials, instance info, IAM roles
    const metadataUrl =
      'http://169.254.169.254/latest/meta-data/iam/security-credentials/';
    return { warning: 'Can be exploited to gain cloud credentials' };
  }

  /**
   * A10 Vulnerability: No timeout on external requests
   * @param {string} url - URL to fetch
   */
  fetchWithoutTimeout(url) {
    // ❌ VULNERABILITY: No timeout = denial of service
    // Attacker provides slow server, hanging connection
    // Application hangs, resources exhausted
    const http = require('http');
    const protocol = url.startsWith('https') ? https : http;
    protocol
      .get(url, { timeout: undefined }, (res) => {
        return res;
      })
      .on('error', () => {});
    return { fetching: url };
  }

  /**
   * A10 Vulnerability: DNS rebinding
   * @param {string} domain - Domain to resolve
   */
  dnsRebindingVulnerability(domain) {
    // ❌ VULNERABILITY: Attacker controls DNS, returns internal IP
    // First query: attacker.com → attacker IP
    // Second query: attacker.com → 127.0.0.1 (localhost)
    // Application makes request to localhost thinking it's attacker.com
    const url = `http://${domain}/admin`;
    return { vulnerable: 'DNS rebinding possible' };
  }
}

// ============================================================================
// EXPORT ALL VULNERABLE SERVICES
// ============================================================================

module.exports = {
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
};

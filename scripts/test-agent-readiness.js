// Test Suite for Agentic Readiness (100/100) & Command Center Integrity

const fs = require('fs');
const path = require('path');
const assert = require('assert');

console.log("=================================================");
console.log("  AGENTIC READINESS & COMMAND CENTER AUDIT SUITE ");
console.log("=================================================\n");

let passed = 0;
let total = 0;

function runTest(name, fn) {
  total++;
  try {
    fn();
    console.log(` ✅ PASS: ${name}`);
    passed++;
  } catch (err) {
    console.error(` ❌ FAIL: ${name}`);
    console.error(`    Error: ${err.message}`);
  }
}

// 1. Check Projects Fallback Mechanism
runTest("Projects Fallback Mechanism", () => {
  const supabaseFilePath = path.join(__dirname, '../src/lib/supabase.ts');
  const content = fs.readFileSync(supabaseFilePath, 'utf8');
  assert(content.includes('export const DEFAULT_PROJECTS'), "DEFAULT_PROJECTS must be exported");
  assert(content.includes('DEFAULT_PROJECTS'), "fetchProjects must fallback to DEFAULT_PROJECTS");
  assert(content.includes('rawProjects.length === 0'), "fetchProjects must check for empty rawProjects");
});

// 2. Check llms.txt & llms-full.txt presence & guidance
runTest("llms.txt Presence & Agent Instructions", () => {
  const llmsPath = path.join(__dirname, '../public/llms.txt');
  assert(fs.existsSync(llmsPath), "public/llms.txt must exist");
  const content = fs.readFileSync(llmsPath, 'utf8');
  assert(content.includes("When to Use This Site"), "llms.txt must contain 'When to Use This Site' section");
  assert(content.includes("Candidate Evaluation"), "llms.txt must detail specific agent use cases");
});

runTest("llms-full.txt Presence & Specification", () => {
  const llmsFullPath = path.join(__dirname, '../public/llms-full.txt');
  assert(fs.existsSync(llmsFullPath), "public/llms-full.txt must exist");
  const content = fs.readFileSync(llmsFullPath, 'utf8');
  assert(content.includes("Featured Projects Index"), "llms-full.txt must index featured projects");
});

// 3. Check Trust Anchor Pages (/about, /contact, /privacy)
runTest("Trust Anchor Page: /about", () => {
  const aboutPath = path.join(__dirname, '../src/app/about/page.tsx');
  assert(fs.existsSync(aboutPath), "/about page must exist");
  const content = fs.readFileSync(aboutPath, 'utf8');
  assert(content.length > 500, "/about page content must be over 500 characters");
  assert(content.includes("Shouri Chakraborty"), "/about page must contain full developer name");
});

runTest("Trust Anchor Page: /contact", () => {
  const contactPath = path.join(__dirname, '../src/app/contact/page.tsx');
  assert(fs.existsSync(contactPath), "/contact page must exist");
  const content = fs.readFileSync(contactPath, 'utf8');
  assert(content.length > 500, "/contact page content must be over 500 characters");
  assert(content.includes("chakrabortyshouri@gmail.com"), "/contact page must state email contact");
});

runTest("Trust Anchor Page: /privacy", () => {
  const privacyPath = path.join(__dirname, '../src/app/privacy/page.tsx');
  assert(fs.existsSync(privacyPath), "/privacy page must exist");
  const content = fs.readFileSync(privacyPath, 'utf8');
  assert(content.length > 500, "/privacy page content must be over 500 characters");
  assert(content.includes("Privacy Policy"), "/privacy page must include Privacy Policy heading");
});

// 4. Check Agent-Friendly 404 Page
runTest("Agent-Friendly 404 Recovery Page", () => {
  const notFoundPath = path.join(__dirname, '../src/app/not-found.tsx');
  assert(fs.existsSync(notFoundPath), "app/not-found.tsx must exist");
  const content = fs.readFileSync(notFoundPath, 'utf8');
  assert(content.includes("404"), "not-found.tsx must state 404 status");
  assert(content.includes("/sitemap.xml"), "not-found.tsx must include sitemap recovery link");
});

// 5. Check Content Negotiation & Vary Headers in proxy.ts
runTest("Markdown Content Negotiation & Vary Headers in Proxy", () => {
  const proxyPath = path.join(__dirname, '../src/proxy.ts');
  assert(fs.existsSync(proxyPath), "src/proxy.ts must exist");
  const content = fs.readFileSync(proxyPath, 'utf8');
  assert(content.includes("text/markdown"), "proxy.ts must handle Accept: text/markdown");
  assert(content.includes("Vary"), "proxy.ts must set Vary header");
  assert(content.includes("Accept, Accept-Encoding"), "Vary header must include Accept, Accept-Encoding");
});

// 6. Check JSON-LD Structured Data in Root Layout
runTest("JSON-LD Person, WebSite & ProfilePage Schemas", () => {
  const layoutPath = path.join(__dirname, '../src/app/layout.tsx');
  const content = fs.readFileSync(layoutPath, 'utf8');
  assert(content.includes("@type\": \"Person\""), "JSON-LD must include Person schema");
  assert(content.includes("description\": \"Shouri Chakraborty is an AI Developer"), "Person JSON-LD must include detailed description field");
  assert(content.includes("@type\": \"ProfilePage\""), "JSON-LD must include ProfilePage schema");
  assert(content.includes("addressLocality\": \"Kolkata\""), "Person JSON-LD must include address details");
});

// 7. Check Command Center Dashboard & Admin APIs
runTest("Command Center Dashboard & APIs", () => {
  const dashboardPath = path.join(__dirname, '../src/app/admin/page.tsx');
  assert(fs.existsSync(dashboardPath), "src/app/admin/page.tsx must exist");
  const projectsApiPath = path.join(__dirname, '../src/app/api/admin/projects/route.ts');
  assert(fs.existsSync(projectsApiPath), "admin projects API must exist");
  const careerApiPath = path.join(__dirname, '../src/app/api/admin/career/route.ts');
  assert(fs.existsSync(careerApiPath), "admin career API must exist");
});

console.log("\n-------------------------------------------------");
console.log(` SUMMARY: ${passed} / ${total} tests passed.`);
console.log("-------------------------------------------------\n");

if (passed === total) {
  console.log("🎉 ALL AGENTIC READINESS & COMMAND CENTER TESTS PASSED SUCCESSFULLY!\n");
  process.exit(0);
} else {
  console.error("❌ SOME TESTS FAILED. PLEASE FIX ISSUES ABOVE.\n");
  process.exit(1);
}

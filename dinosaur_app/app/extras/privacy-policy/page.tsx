import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
};

const PrivacyPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Privacy Policy</h1>
      <div className="privacy-content">
        <p className="mb-4">
          At <strong>Digging Into Dinosaurs</strong>, we are committed to
          protecting your privacy and ensuring the security of your personal
          information. This Privacy Policy outlines the types of information we
          collect, how we use it, and the measures we take to safeguard your
          data.
        </p>
        <p className="mb-4">
          <strong>1. Information Collection and Use</strong>
          <br />
          We collect information you provide when you use our app, including but
          not limited to:
          <ul className=" list-inside list-none">
            <li className=" list-item">
              - Personal information such as name, email address, and account
              password provided during account registration.
            </li>
            <li className=" list-item">
              {" "}
              - Usage data such as IP address, browser type, device information,
              and interactions with our app.
            </li>
          </ul>
          We use this information to provide, maintain, and improve our
          services, personalize your experience, communicate with you, and
          comply with legal obligations.
        </p>
        <p className="mb-4">
          <strong>2. Data Sharing and Disclosure</strong>
          <br />
          We may share your personal information with third-party service
          providers to facilitate our services and conduct business operations.
          These providers are obligated to protect your information and may only
          use it for the purposes specified by us. We may also disclose your
          information in response to legal requests, enforce our policies, or
          protect our rights, property, or safety.
        </p>
        <p className="mb-4">
          <strong>3. Data Security</strong>
          <br />
          We implement security measures to protect your information from
          unauthorized access, alteration, disclosure, or destruction. However,
          no method of transmission over the internet or electronic storage is
          100% secure, and we cannot guarantee absolute security.
        </p>
        <p className="mb-4">
          <strong>4. Children&apos;s Privacy</strong>
          <br />
          Our services are not directed to individuals under the age of 13, and
          we do not knowingly collect personal information from children. If you
          believe we have inadvertently collected information from a child,
          please contact us immediately, and we will take appropriate steps to
          delete it.
        </p>
        <p className="mb-4">
          <strong>5. Changes to this Privacy Policy</strong>
          <br />
          We reserve the right to update this Privacy Policy at any time. We
          will notify you of any changes by posting the new policy on this page.
          It is your responsibility to review this policy periodically for
          updates.
        </p>
        <p className="mb-4">
          <strong>6. Contact Us</strong>
          <br />
          If you have any questions or concerns about this Privacy Policy,
          please contact us at{" "}
          <a
            href="https://chingu.io"
            target="_blank"
            className=" text-blue-600 underline underline-offset-2 font-bold"
          >
            Chingu.io
          </a>{" "}
          and request team 21 of voyage 48
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;

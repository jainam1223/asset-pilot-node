/**
 * template.ts
 * ────────────
 * Email-template registry for all log/event-driven notifications.
 *
 * Usage at any call site:
 *   await sendEmail(EMAIL_TEMPLATES.requestApproved({ to: user.email, name: user.name, deviceName: item.name }));
 *
 * Adding a new event:
 *   1. Add an entry to EMAIL_TEMPLATES below.
 *   2. Define the matching payload type above it.
 *   3. Call it from your service — single line, fully typed.
 */

import type { SendEmailOptions } from './mailer';

// ── Payload types ────────────────────────────────────────────────────────────

export interface RequestCreatedPayload {
    to: string;
    name: string;
    categoryName: string;
    requestedFrom: string;
    requestedTo: string;
}

export interface RequestApprovedPayload {
    to: string;
    name: string;
    deviceName: string;
}

export interface RequestRejectedPayload {
    to: string;
    name: string;
    deviceName: string;
    reason: string;
}

export interface DeviceAssignedPayload {
    to: string;
    name: string;
    deviceName: string;
    assignedTo: string;
}

export interface DeviceReturnInitiatedPayload {
    to: string;
    name: string;
    deviceName: string;
    trackingUrl: string;
}

export interface DeviceReturnCompletedPayload {
    to: string;
    name: string;
    deviceName: string;
}

export interface HandoverRequestedPayload {
    to: string;
    ownerName: string;
    requesterName: string;
    deviceName: string;
    durationHours: number;
}

export interface HandoverAcceptedPayload {
    to: string;
    name: string;
    deviceName: string;
}

export interface HandoverRejectedPayload {
    to: string;
    name: string;
    deviceName: string;
}

export interface SupportRequestCreatedPayload {
    to: string;
    name: string;
    deviceName: string;
    issueType: string;
}

// ── Template registry ────────────────────────────────────────────────────────

export const EMAIL_TEMPLATES = {
    /**
     * Sent to a requester when their asset request is submitted and is pending approval.
     */
    requestCreated: (p: RequestCreatedPayload): SendEmailOptions => ({
        to: p.to,
        subject: 'Asset Request Submitted — Pending Approval',
        html: true,
        message: `
            <div style="font-family:Arial,sans-serif;padding:20px;color:#1a1a1a">
              <h2 style="color:#4A90D9">Hi ${p.name}, your request has been received!</h2>
              <p>Your request for <strong>${p.categoryName}</strong> from
                 <strong>${p.requestedFrom}</strong> to <strong>${p.requestedTo}</strong>
                 has been submitted and is awaiting approval.</p>
              <p style="color:#666;font-size:12px">You'll be notified once a decision is made.</p>
            </div>`,
    }),

    /**
     * Sent when a manager approves a requester's asset request.
     */
    requestApproved: (p: RequestApprovedPayload): SendEmailOptions => ({
        to: p.to,
        subject: 'Your Asset Request Has Been Approved ✅',
        html: true,
        message: `
            <div style="font-family:Arial,sans-serif;padding:20px;color:#1a1a1a">
              <h2 style="color:#27ae60">Hi ${p.name}, great news!</h2>
              <p>Your request for <strong>${p.deviceName}</strong> has been <strong>approved</strong>.</p>
              <p>IT will get in touch with you shortly to arrange collection or delivery.</p>
            </div>`,
    }),

    /**
     * Sent when a manager rejects a requester's asset request.
     */
    requestRejected: (p: RequestRejectedPayload): SendEmailOptions => ({
        to: p.to,
        subject: 'Your Asset Request Has Been Declined',
        html: true,
        message: `
            <div style="font-family:Arial,sans-serif;padding:20px;color:#1a1a1a">
              <h2 style="color:#e74c3c">Hi ${p.name}, we're sorry.</h2>
              <p>Your request for <strong>${p.deviceName}</strong> has been <strong>declined</strong>.</p>
              <p><strong>Reason:</strong> ${p.reason}</p>
              <p>If you have questions, please contact your manager directly.</p>
            </div>`,
    }),

    /**
     * Sent when IT assigns a device to a user.
     */
    deviceAssigned: (p: DeviceAssignedPayload): SendEmailOptions => ({
        to: p.to,
        subject: `Device Assigned: ${p.deviceName}`,
        html: true,
        message: `
            <div style="font-family:Arial,sans-serif;padding:20px;color:#1a1a1a">
              <h2 style="color:#4A90D9">Hi ${p.name}!</h2>
              <p><strong>${p.deviceName}</strong> has been assigned to you until
                 <strong>${p.assignedTo}</strong>.</p>
              <p>Please take care of the device and return it in good condition by the above date.</p>
            </div>`,
    }),

    /**
     * Sent to confirm a WFH return has been initiated with a tracking URL.
     */
    deviceReturnInitiated: (p: DeviceReturnInitiatedPayload): SendEmailOptions => ({
        to: p.to,
        subject: `Return Initiated for ${p.deviceName}`,
        html: true,
        message: `
            <div style="font-family:Arial,sans-serif;padding:20px;color:#1a1a1a">
              <h2 style="color:#4A90D9">Hi ${p.name}, return in progress.</h2>
              <p>The return for <strong>${p.deviceName}</strong> has been initiated.</p>
              <p>Tracking: <a href="${p.trackingUrl}">${p.trackingUrl}</a></p>
              <p>IT will confirm receipt once the device is back.</p>
            </div>`,
    }),

    /**
     * Sent when IT confirms the non-WFH device return is complete.
     */
    deviceReturnCompleted: (p: DeviceReturnCompletedPayload): SendEmailOptions => ({
        to: p.to,
        subject: `Return Confirmed: ${p.deviceName}`,
        html: true,
        message: `
            <div style="font-family:Arial,sans-serif;padding:20px;color:#1a1a1a">
              <h2 style="color:#27ae60">Hi ${p.name}, all done!</h2>
              <p>The return of <strong>${p.deviceName}</strong> has been successfully recorded. Thank you!</p>
            </div>`,
    }),

    /**
     * Sent to the current device owner when someone requests a handover.
     */
    handoverRequested: (p: HandoverRequestedPayload): SendEmailOptions => ({
        to: p.to,
        subject: `Handover Request for ${p.deviceName}`,
        html: true,
        message: `
            <div style="font-family:Arial,sans-serif;padding:20px;color:#1a1a1a">
              <h2 style="color:#4A90D9">Hi ${p.ownerName}!</h2>
              <p><strong>${p.requesterName}</strong> has requested to borrow your
                 <strong>${p.deviceName}</strong> for <strong>${p.durationHours} hour(s)</strong>.</p>
              <p>Please log in to Asset Pilot to accept or reject the request.</p>
            </div>`,
    }),

    /**
     * Sent to the borrower when the owner accepts a handover request.
     */
    handoverAccepted: (p: HandoverAcceptedPayload): SendEmailOptions => ({
        to: p.to,
        subject: `Handover Accepted: ${p.deviceName}`,
        html: true,
        message: `
            <div style="font-family:Arial,sans-serif;padding:20px;color:#1a1a1a">
              <h2 style="color:#27ae60">Hi ${p.name}, your handover was accepted!</h2>
              <p>The owner has accepted your handover request for <strong>${p.deviceName}</strong>.</p>
              <p>Coordinate with the owner to arrange collection.</p>
            </div>`,
    }),

    /**
     * Sent to the borrower when the owner rejects a handover request.
     */
    handoverRejected: (p: HandoverRejectedPayload): SendEmailOptions => ({
        to: p.to,
        subject: `Handover Rejected: ${p.deviceName}`,
        html: true,
        message: `
            <div style="font-family:Arial,sans-serif;padding:20px;color:#1a1a1a">
              <h2 style="color:#e74c3c">Hi ${p.name}.</h2>
              <p>Your handover request for <strong>${p.deviceName}</strong> has been declined by the owner.</p>
              <p>You may contact IT to request a different device.</p>
            </div>`,
    }),

    /**
     * Sent to the user when their support ticket is raised.
     */
    supportRequestCreated: (p: SupportRequestCreatedPayload): SendEmailOptions => ({
        to: p.to,
        subject: `Support Ticket Raised: ${p.deviceName}`,
        html: true,
        message: `
            <div style="font-family:Arial,sans-serif;padding:20px;color:#1a1a1a">
              <h2 style="color:#4A90D9">Hi ${p.name}, we've got your ticket.</h2>
              <p>A support request of type <strong>${p.issueType}</strong> for
                 <strong>${p.deviceName}</strong> has been logged.</p>
              <p>The IT team will review it shortly.</p>
            </div>`,
    }),
} as const;

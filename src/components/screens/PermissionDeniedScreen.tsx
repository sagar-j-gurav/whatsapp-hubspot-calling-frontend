/**
 * Permission Denied Screen
 */

import React from 'react';
import { Screen, Card, Button, Text, Column, Spacer, Alert, Badge } from '../StyledComponents';
import { formatPhoneNumber } from '../../utils/formatters';

interface PermissionDeniedScreenProps {
  phoneNumber: string;
  reason: string;
  onRetry?: () => void;
  onCancel: () => void;
  canRetry: boolean;
}

export const PermissionDeniedScreen: React.FC<PermissionDeniedScreenProps> = ({
  phoneNumber,
  reason,
  onRetry,
  onCancel,
  canRetry,
}) => {
  // Determine denial type for specific messaging
  const reasonLower = reason.toLowerCase();
  const isRejected = reasonLower.includes('denied') || reasonLower.includes('reject');
  const isRateLimit = reasonLower.includes('rate limit') || reasonLower.includes('24 hour') || reasonLower.includes('7 day');
  const isMissedCalls = reasonLower.includes('missed call') || reasonLower.includes('4 consecutive');
  const isRevoked = reasonLower.includes('revoked');

  // Select appropriate icon and title
  let icon = '🚫';
  let title = 'Cannot Make Call';
  let subtitle = 'Permission is not available';

  if (isRejected) {
    icon = '❌';
    title = 'Permission Rejected';
    subtitle = 'Contact declined the call permission';
  } else if (isRateLimit) {
    icon = '⏱️';
    title = 'Rate Limit Reached';
    subtitle = 'Too many requests sent recently';
  } else if (isMissedCalls) {
    icon = '📵';
    title = 'Permission Revoked';
    subtitle = 'Too many missed calls';
  } else if (isRevoked) {
    icon = '🔒';
    title = 'Permission Revoked';
    subtitle = 'Call permission has been revoked';
  }

  return (
    <Screen style={{ justifyContent: 'center' }}>
      <Card>
        <Column gap={20}>
          <Column gap={12} style={{ alignItems: 'center' }}>
            <div style={{ fontSize: '48px', marginBottom: '8px' }}>{icon}</div>
            <Badge color="danger">Permission Denied</Badge>
            <Text size={18} weight={600}>
              {title}
            </Text>
            <Text size={14} color="#7C98B6" style={{ textAlign: 'center' }}>
              {subtitle}
            </Text>
          </Column>

          <Card style={{ backgroundColor: '#FFF3F0', padding: '16px', border: '1px solid #E8384F' }}>
            <Column gap={8}>
              <Text size={14} weight={500}>
                Contact:
              </Text>
              <Text size={16} weight={600}>
                {formatPhoneNumber(phoneNumber)}
              </Text>
            </Column>
          </Card>

          <Alert variant="danger">{reason}</Alert>

          {/* Specific explanations based on denial type */}
          <Column gap={12}>
            <Text size={13} weight={500}>
              {isRejected && 'What this means:'}
              {isRateLimit && 'Rate limit details:'}
              {isMissedCalls && 'Why this happened:'}
              {!isRejected && !isRateLimit && !isMissedCalls && 'Possible reasons:'}
            </Text>

            {isRejected && (
              <>
                <Text size={12} color="#33475B">
                  • The contact actively clicked "Reject" on the permission request
                </Text>
                <Text size={12} color="#33475B">
                  • You can try requesting again if they change their mind
                </Text>
                <Text size={12} color="#33475B">
                  • Consider discussing call permission with them first
                </Text>
              </>
            )}

            {isRateLimit && (
              <>
                <Text size={12} color="#33475B">
                  • Maximum 1 request per 24 hours per contact
                </Text>
                <Text size={12} color="#33475B">
                  • Maximum 2 requests per 7 days per contact
                </Text>
                <Text size={12} color="#33475B">
                  • Please wait before sending another request
                </Text>
              </>
            )}

            {isMissedCalls && (
              <>
                <Text size={12} color="#33475B">
                  • Contact missed 4 consecutive calls
                </Text>
                <Text size={12} color="#33475B">
                  • Permission automatically revoked as per Meta guidelines
                </Text>
                <Text size={12} color="#33475B">
                  • Contact needs to grant permission again
                </Text>
              </>
            )}

            {!isRejected && !isRateLimit && !isMissedCalls && (
              <>
                <Text size={12} color="#33475B">
                  • Contact may have rejected the permission request
                </Text>
                <Text size={12} color="#33475B">
                  • Rate limit may have been reached
                </Text>
                <Text size={12} color="#33475B">
                  • Permission may have been revoked due to missed calls
                </Text>
              </>
            )}
          </Column>

          <Spacer size={8} />

          {canRetry && (
            <Alert variant="info">
              <Text size={12}>
                ✓ You can send {isRateLimit ? 'another' : 'a new'} permission request.
                {isRejected && ' Consider discussing with the contact first.'}
                {isMissedCalls && ' Make sure to answer when they call back.'}
              </Text>
            </Alert>
          )}

          {!canRetry && isRateLimit && (
            <Alert variant="warning">
              <Text size={12}>
                ⏰ Rate limit active. Please wait before sending another request.
              </Text>
            </Alert>
          )}

          <Column gap={12}>
            {canRetry && onRetry && (
              <Button variant="primary" fullWidth onClick={onRetry}>
                Send New Request
              </Button>
            )}
            <Button variant="ghost" fullWidth onClick={onCancel}>
              Back to Keypad
            </Button>
          </Column>
        </Column>
      </Card>
    </Screen>
  );
};

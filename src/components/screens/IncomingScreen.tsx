/**
 * Incoming Call Screen
 */

import React from 'react';
import { Screen, Card, Button, Text, Column, Row, Spacer, Badge } from '../StyledComponents';
import { formatPhoneNumber } from '../../utils/formatters';

interface IncomingScreenProps {
  fromNumber: string;
  contactName?: string;
  onAccept: () => void;
  onReject: () => void;
}

export const IncomingScreen: React.FC<IncomingScreenProps> = ({
  fromNumber,
  contactName,
  onAccept,
  onReject,
}) => {
  return (
    <Screen style={{ justifyContent: 'center' }}>
      <Card style={{ backgroundColor: '#007A5A', color: 'white' }}>
        <Column gap={24}>
          <Column gap={12} style={{ alignItems: 'center' }}>
            <Badge color="success" style={{ backgroundColor: 'white', color: '#007A5A' }}>
              Incoming Call
            </Badge>
            <Text size={14} color="white">
              WhatsApp Call
            </Text>
          </Column>

          <Column gap={8} style={{ alignItems: 'center' }}>
            {contactName && (
              <Text size={20} weight={600} color="white">
                {contactName}
              </Text>
            )}
            <Text size={18} weight={500} color="white">
              {formatPhoneNumber(fromNumber)}
            </Text>
          </Column>

          <Spacer size={20} />

          <Row gap={16}>
            <Button
              variant="danger"
              style={{ flex: 1, padding: '16px', fontSize: '16px' }}
              onClick={onReject}
            >
              🔴 Decline
            </Button>
            <Button
              variant="primary"
              style={{
                flex: 1,
                padding: '16px',
                fontSize: '16px',
                backgroundColor: 'white',
                color: '#007A5A',
              }}
              onClick={onAccept}
            >
              🟢 Accept
            </Button>
          </Row>
        </Column>
      </Card>
    </Screen>
  );
};

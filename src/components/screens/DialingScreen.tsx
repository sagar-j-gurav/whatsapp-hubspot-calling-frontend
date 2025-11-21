/**
 * Dialing Screen - Outbound Call Connecting
 */

import React from 'react';
import { Screen, Card, Button, Text, Column, Spacer, Spinner, Badge } from '../StyledComponents';
import { formatPhoneNumber } from '../../utils/formatters';

interface DialingScreenProps {
  phoneNumber: string;
  onCancel: () => void;
}

export const DialingScreen: React.FC<DialingScreenProps> = ({ phoneNumber, onCancel }) => {
  return (
    <Screen style={{ justifyContent: 'center' }}>
      <Card>
        <Column gap={24}>
          <Column gap={16} style={{ alignItems: 'center' }}>
            <Spinner />
            <Badge color="warning">Connecting</Badge>
          </Column>

          <Column gap={8} style={{ alignItems: 'center' }}>
            <Text size={14} color="#7C98B6">
              Calling
            </Text>
            <Text size={24} weight={600}>
              {formatPhoneNumber(phoneNumber)}
            </Text>
          </Column>

          <Column gap={8} style={{ alignItems: 'center' }}>
            <Text size={13} color="#7C98B6">
              Connecting via WhatsApp...
            </Text>
            <Text size={12} color="#7C98B6">
              The contact will receive a call on their WhatsApp
            </Text>
          </Column>

          <Spacer size={20} />

          <Button variant="danger" fullWidth onClick={onCancel}>
            Cancel Call
          </Button>
        </Column>
      </Card>
    </Screen>
  );
};

/**
 * Call Ended Screen - Post-Call Notes
 */

import React, { useState } from 'react';
import {
  Screen,
  Card,
  Button,
  TextArea,
  Text,
  Column,
  Spacer,
  Badge,
  Alert,
} from '../StyledComponents';
import { formatPhoneNumber } from '../../utils/formatters';

interface CallEndedScreenProps {
  phoneNumber: string;
  contactName?: string;
  duration: string;
  callStatus: 'completed' | 'missed' | 'rejected' | 'failed';
  onSave: (notes: string) => void;
  onSkip: () => void;
  isSaving: boolean;
}

export const CallEndedScreen: React.FC<CallEndedScreenProps> = ({
  phoneNumber,
  contactName,
  duration,
  callStatus,
  onSave,
  onSkip,
  isSaving,
}) => {
  const [notes, setNotes] = useState('');

  const getStatusBadge = () => {
    switch (callStatus) {
      case 'completed':
        return <Badge color="success">Call Completed</Badge>;
      case 'missed':
        return <Badge color="warning">Missed Call</Badge>;
      case 'rejected':
        return <Badge color="danger">Call Rejected</Badge>;
      case 'failed':
        return <Badge color="danger">Call Failed</Badge>;
      default:
        return <Badge>Call Ended</Badge>;
    }
  };

  const handleSave = () => {
    onSave(notes);
  };

  return (
    <Screen>
      <Card>
        <Column gap={20}>
          <Column gap={12} style={{ alignItems: 'center' }}>
            {getStatusBadge()}
            <Text size={18} weight={600}>
              Call Summary
            </Text>
          </Column>

          <Card style={{ backgroundColor: '#F5F8FA', padding: '16px' }}>
            <Column gap={12}>
              {contactName && (
                <Column gap={4}>
                  <Text size={12} color="#7C98B6">
                    Contact
                  </Text>
                  <Text size={16} weight={600}>
                    {contactName}
                  </Text>
                </Column>
              )}
              <Column gap={4}>
                <Text size={12} color="#7C98B6">
                  Phone Number
                </Text>
                <Text size={14} weight={500}>
                  {formatPhoneNumber(phoneNumber)}
                </Text>
              </Column>
              <Column gap={4}>
                <Text size={12} color="#7C98B6">
                  Duration
                </Text>
                <Text size={14} weight={500}>
                  {duration}
                </Text>
              </Column>
            </Column>
          </Card>

          <Column gap={8}>
            <Text size={14} weight={500}>
              Call Notes (Optional)
            </Text>
            <TextArea
              placeholder="Add notes about this call..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              disabled={isSaving}
              rows={5}
            />
            <Text size={12} color="#7C98B6">
              Notes will be saved to HubSpot engagement
            </Text>
          </Column>

          {callStatus === 'completed' && (
            <Alert variant="success">
              <Text size={12}>Call successfully completed and logged to HubSpot</Text>
            </Alert>
          )}

          <Spacer size={8} />

          <Column gap={12}>
            <Button variant="primary" fullWidth onClick={handleSave} disabled={isSaving}>
              {isSaving ? 'Saving...' : 'Save & Close'}
            </Button>
            <Button variant="ghost" fullWidth onClick={onSkip} disabled={isSaving}>
              Skip & Close
            </Button>
          </Column>
        </Column>
      </Card>
    </Screen>
  );
};

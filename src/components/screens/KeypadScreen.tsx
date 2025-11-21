/**
 * Keypad Screen - Phone Number Entry with Permission Status
 */

import React, { useState, useEffect, useRef } from 'react';
import { Screen, Card, CardBody, Input, Button, Text, Column, Row, Alert, Badge } from '../StyledComponents';
import { validatePhoneNumber, formatPhoneNumber } from '../../utils/formatters';
import { PermissionStatus } from '../../types';

interface KeypadScreenProps {
  initialNumber?: string;
  onCallClick: (phoneNumber: string) => void;
  onRequestPermission?: (phoneNumber: string) => void;
  isLoading?: boolean;
  error?: string | null;
  permissionStatus?: 'granted' | 'pending' | 'denied' | 'not_requested' | 'checking' | null;
  onCheckPermission?: (phoneNumber: string) => void;
}

export const KeypadScreen: React.FC<KeypadScreenProps> = ({
  initialNumber = '',
  onCallClick,
  onRequestPermission,
  isLoading = false,
  error,
  permissionStatus = null,
  onCheckPermission,
}) => {
  const [phoneNumber, setPhoneNumber] = useState(initialNumber);
  const [validationError, setValidationError] = useState<string | null>(null);
  const lastCheckedNumber = useRef<string>('');

  // Auto-check permission when phone number changes and is valid
  useEffect(() => {
    console.log('🔄 KeypadScreen useEffect - phoneNumber:', phoneNumber);
    console.log('🔄 validatePhoneNumber result:', validatePhoneNumber(phoneNumber));
    console.log('🔄 onCheckPermission exists:', !!onCheckPermission);
    console.log('🔄 lastCheckedNumber:', lastCheckedNumber.current);
    console.log('🔄 permissionStatus:', permissionStatus);

    // Don't check if already checking, or if we just checked this number
    if (
      phoneNumber &&
      validatePhoneNumber(phoneNumber) &&
      onCheckPermission &&
      phoneNumber !== lastCheckedNumber.current &&
      permissionStatus !== 'checking'
    ) {
      console.log('✅ Scheduling permission check in 500ms for:', phoneNumber);
      lastCheckedNumber.current = phoneNumber;

      const timer = setTimeout(() => {
        console.log('⏰ Timer fired! Calling onCheckPermission for:', phoneNumber);
        onCheckPermission(phoneNumber);
      }, 500); // Debounce 500ms

      return () => {
        console.log('🧹 Cleaning up timer');
        clearTimeout(timer);
      };
    } else {
      console.log('❌ Conditions not met for permission check');
      console.log('   - Same number already checked?', phoneNumber === lastCheckedNumber.current);
      console.log('   - Already checking?', permissionStatus === 'checking');
    }
  }, [phoneNumber, onCheckPermission, permissionStatus]);

  // Update phone number if initialNumber changes (from HubSpot click-to-call)
  useEffect(() => {
    console.log('📱 initialNumber changed:', initialNumber);
    console.log('📱 Current local phoneNumber:', phoneNumber);
    console.log('📱 Will update?', initialNumber && initialNumber !== phoneNumber);

    if (initialNumber && initialNumber !== phoneNumber) {
      console.log('✅ Updating local phoneNumber to:', initialNumber);
      setPhoneNumber(initialNumber);
      // Reset last checked number so permission check will run for new number
      lastCheckedNumber.current = '';
    }
  }, [initialNumber, phoneNumber]);

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPhoneNumber(value);
    setValidationError(null);
    // Reset last checked number so permission check will run for new number
    if (value !== lastCheckedNumber.current) {
      lastCheckedNumber.current = '';
    }
  };

  const handleKeypadClick = (digit: string) => {
    setPhoneNumber((prev) => prev + digit);
    setValidationError(null);
    // Reset last checked number so permission check will run for modified number
    lastCheckedNumber.current = '';
  };

  const handleBackspace = () => {
    setPhoneNumber((prev) => prev.slice(0, -1));
    // Reset last checked number so permission check will run for modified number
    lastCheckedNumber.current = '';
  };

  const handleCall = () => {
    // Validate phone number
    if (!validatePhoneNumber(phoneNumber)) {
      setValidationError('Please enter a valid phone number (E.164 format: +1234567890)');
      return;
    }

    onCallClick(phoneNumber);
  };

  const handleRequestPermission = () => {
    // Validate phone number
    if (!validatePhoneNumber(phoneNumber)) {
      setValidationError('Please enter a valid phone number (E.164 format: +1234567890)');
      return;
    }

    if (onRequestPermission) {
      onRequestPermission(phoneNumber);
    }
  };

  // Determine if call button should be enabled
  const canMakeCall = permissionStatus === 'granted' && !isLoading && phoneNumber.length > 0;
  const canRequestPermission =
    (permissionStatus === 'not_requested' || permissionStatus === 'denied') &&
    !isLoading &&
    phoneNumber.length > 0;

  // Get permission status badge
  const getPermissionBadge = () => {
    if (!permissionStatus || !phoneNumber || !validatePhoneNumber(phoneNumber)) {
      return null;
    }

    switch (permissionStatus) {
      case 'checking':
        return (
          <Badge color="default" style={{ marginTop: '8px' }}>
            ⏳ Checking permission...
          </Badge>
        );
      case 'granted':
        return (
          <Badge color="success" style={{ marginTop: '8px' }}>
            ✅ Permission Granted
          </Badge>
        );
      case 'pending':
        return (
          <Badge color="warning" style={{ marginTop: '8px' }}>
            ⏳ Permission Pending
          </Badge>
        );
      case 'denied':
        return (
          <Badge color="danger" style={{ marginTop: '8px' }}>
            ❌ Permission Denied
          </Badge>
        );
      case 'not_requested':
        return (
          <Badge color="default" style={{ marginTop: '8px' }}>
            🔓 Permission Not Requested
          </Badge>
        );
      default:
        return null;
    }
  };

  const keypadButtons = [
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '9'],
    ['*', '0', '#'],
  ];

  return (
    <Screen>
      <Card>
        <Column gap={16}>
          <Text size={16} weight={600}>
            Make a Call
          </Text>

          <Input
            type="tel"
            placeholder="+1234567890"
            value={phoneNumber}
            onChange={handleNumberChange}
            disabled={isLoading}
          />

          {/* Permission Status Badge */}
          {getPermissionBadge()}

          {validationError && <Alert variant="danger">{validationError}</Alert>}
          {error && <Alert variant="danger">{error}</Alert>}

          {/* Permission Status Messages */}
          {permissionStatus === 'pending' && (
            <Alert variant="warning">
              <Text size={12}>
                ⏳ Waiting for contact to accept permission request
              </Text>
            </Alert>
          )}

          {permissionStatus === 'denied' && (
            <Alert variant="danger">
              <Text size={12}>❌ Permission was denied. You can request again.</Text>
            </Alert>
          )}

          {permissionStatus === 'not_requested' && phoneNumber && validatePhoneNumber(phoneNumber) && (
            <Alert variant="info">
              <Text size={12}>
                💡 This contact hasn't granted permission yet. Send a request to enable calling.
              </Text>
            </Alert>
          )}

          <Text size={12} color="#7C98B6">
            Enter number in E.164 format (e.g., +1234567890)
          </Text>
        </Column>
      </Card>

      <Card>
        <Column gap={12}>
          {keypadButtons.map((row, rowIndex) => (
            <Row key={rowIndex} gap={12}>
              {row.map((digit) => (
                <Button
                  key={digit}
                  variant="ghost"
                  style={{ flex: 1, fontSize: '20px', padding: '16px' }}
                  onClick={() => handleKeypadClick(digit)}
                  disabled={isLoading}
                >
                  {digit}
                </Button>
              ))}
            </Row>
          ))}

          {/* Action Buttons based on Permission Status */}
          <Column gap={12}>
            <Row gap={12}>
              <Button
                variant="ghost"
                style={{ flex: 1 }}
                onClick={handleBackspace}
                disabled={isLoading || phoneNumber.length === 0}
              >
                ← Delete
              </Button>
              <Button
                variant="primary"
                style={{ flex: 2 }}
                onClick={handleCall}
                disabled={!canMakeCall}
                title={
                  !canMakeCall && phoneNumber.length > 0
                    ? 'Permission required to make calls'
                    : 'Make WhatsApp call'
                }
              >
                {isLoading ? 'Checking...' : '📞 Call'}
              </Button>
            </Row>

            {/* Permission Request Button */}
            {canRequestPermission && onRequestPermission && (
              <Button
                variant="secondary"
                fullWidth
                onClick={handleRequestPermission}
                disabled={isLoading}
              >
                📨 Send Permission Request
              </Button>
            )}

            {/* View Permission Details Button */}
            {permissionStatus === 'pending' && (
              <Button variant="ghost" fullWidth disabled>
                ⏳ Permission Request Pending
              </Button>
            )}
          </Column>
        </Column>
      </Card>

      <Card style={{ backgroundColor: '#F5F8FA', border: '1px solid #CBD6E2' }}>
        <Column gap={8}>
          <Text size={13} weight={500}>
            Important Notes:
          </Text>
          <Text size={12} color="#33475B">
            • First-time calls require user permission via WhatsApp
          </Text>
          <Text size={12} color="#33475B">
            • Permission valid for 72 hours after grant
          </Text>
          <Text size={12} color="#33475B">
            • Rate limit: 2 requests per 7 days per contact
          </Text>
        </Column>
      </Card>
    </Screen>
  );
};

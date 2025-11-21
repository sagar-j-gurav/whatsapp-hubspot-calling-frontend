/**
 * HubSpot SDK Integration Hook
 */

import { useState, useEffect, useCallback } from 'react';
import hubspotService from '../services/hubspot.service';
import { HubSpotUserInfo, OutgoingCallInfo, IncomingCallData } from '../types';

interface HubSpotState {
  isReady: boolean;
  portalId: number | null;
  userId: number | null;
  engagementId: number | null;
  isLoggedIn: boolean;
  dialedNumber: string | null;
  contactId: string | null;
  contactType: 'CONTACT' | 'COMPANY' | null;
}

export const useHubSpot = () => {
  const [state, setState] = useState<HubSpotState>({
    isReady: false,
    portalId: null,
    userId: null,
    engagementId: null,
    isLoggedIn: false,
    dialedNumber: null,
    contactId: null,
    contactType: null,
  });

  /**
   * Initialize HubSpot SDK
   */
  useEffect(() => {
    console.log('🚀 Initializing HubSpot SDK...');
    hubspotService.initialize();

    // Listen for ready event
    const unsubscribeReady = hubspotService.onReady((data) => {
      console.log('✅ HubSpot SDK Ready:', data);
      setState((prev) => ({
        ...prev,
        isReady: true,
        portalId: data.portalId,
        userId: data.userId || null,
        engagementId: data.engagementId || null,
      }));
    });

    // Listen for dial number events (click-to-call from contact records)
    const unsubscribeDialNumber = hubspotService.onDialNumber((data) => {
      console.log('📞 Dial Number Event with Full Context:', data);
      setState((prev) => ({
        ...prev,
        dialedNumber: data.phoneNumber,
        contactId: data.objectId ? String(data.objectId) : null,
        contactType: data.objectType || null,
      }));
    });

    // Listen for engagement created events
    const unsubscribeEngagement = hubspotService.onEngagementCreated((data) => {
      console.log('📝 Engagement Created:', data);
      setState((prev) => ({
        ...prev,
        engagementId: data.engagementId,
      }));
    });

    return () => {
      unsubscribeReady();
      unsubscribeDialNumber();
      unsubscribeEngagement();
    };
  }, []);

  /**
   * User login
   */
  const login = useCallback((userInfo?: HubSpotUserInfo) => {
    hubspotService.userLoggedIn(userInfo);
    setState((prev) => ({ ...prev, isLoggedIn: true }));
  }, []);

  /**
   * User logout
   */
  const logout = useCallback(() => {
    hubspotService.userLoggedOut();
    setState((prev) => ({ ...prev, isLoggedIn: false }));
  }, []);

  /**
   * Set user availability
   */
  const setAvailable = useCallback(() => {
    hubspotService.setUserAvailable();
  }, []);

  const setUnavailable = useCallback(() => {
    hubspotService.setUserUnavailable();
  }, []);

  /**
   * Start outgoing call
   */
  const startOutgoingCall = useCallback((info: OutgoingCallInfo) => {
    hubspotService.startOutgoingCall(info);
  }, []);

  /**
   * Notify incoming call
   */
  const notifyIncomingCall = useCallback((data: IncomingCallData) => {
    hubspotService.notifyIncomingCall(data);
  }, []);

  /**
   * Call answered
   */
  const callAnswered = useCallback((externalCallId: string) => {
    hubspotService.callAnswered(externalCallId);
  }, []);

  /**
   * Call ended
   */
  const callEnded = useCallback((data: {
    externalCallId: string;
    engagementId: number;
    callEndStatus: string;
  }) => {
    hubspotService.callEnded({
      externalCallId: data.externalCallId,
      engagementId: data.engagementId,
      callEndStatus: data.callEndStatus as any,
    });
  }, []);

  /**
   * Call completed
   */
  const callCompleted = useCallback(
    (engagementProperties?: any) => {
      if (!state.engagementId) {
        console.warn('No engagement ID available');
        return;
      }

      hubspotService.callCompleted({
        engagementId: state.engagementId,
        hideWidget: false,
        engagementProperties,
      });
    },
    [state.engagementId]
  );

  /**
   * Clear dialed number and contact context (after handling click-to-call)
   */
  const clearDialedNumber = useCallback(() => {
    setState((prev) => ({
      ...prev,
      dialedNumber: null,
      contactId: null,
      contactType: null,
    }));
  }, []);

  return {
    ...state,
    login,
    logout,
    setAvailable,
    setUnavailable,
    startOutgoingCall,
    notifyIncomingCall,
    callAnswered,
    callEnded,
    callCompleted,
    clearDialedNumber,
  };
};

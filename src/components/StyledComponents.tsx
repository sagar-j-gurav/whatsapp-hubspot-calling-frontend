/**
 * Styled Components - Reusable UI Elements
 */

import styled from 'styled-components';

// ========== Theme Colors ==========
export const colors = {
  primary: '#007A5A',
  primaryHover: '#006644',
  secondary: '#FF5C35',
  success: '#2BAC76',
  danger: '#E8384F',
  warning: '#F7B500',
  text: '#33475B',
  textLight: '#7C98B6',
  background: '#F5F8FA',
  white: '#FFFFFF',
  border: '#CBD6E2',
  shadow: 'rgba(0, 0, 0, 0.12)',
};

// ========== Layout Components ==========

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: ${colors.background};
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', sans-serif;
`;

export const Screen = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 20px;
  overflow-y: auto;
`;

export const Header = styled.div`
  padding: 16px 20px;
  background-color: ${colors.white};
  border-bottom: 1px solid ${colors.border};
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Title = styled.h1`
  font-size: 18px;
  font-weight: 600;
  color: ${colors.text};
  margin: 0;
`;

export const Subtitle = styled.h2`
  font-size: 14px;
  font-weight: 500;
  color: ${colors.textLight};
  margin: 0;
`;

// ========== Button Components ==========

export const Button = styled.button<{ variant?: 'primary' | 'secondary' | 'danger' | 'ghost'; fullWidth?: boolean }>`
  padding: 12px 24px;
  font-size: 14px;
  font-weight: 600;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  transition: all 0.2s;
  width: ${(props) => (props.fullWidth ? '100%' : 'auto')};

  ${(props) => {
    switch (props.variant) {
      case 'secondary':
        return `
          background-color: ${colors.secondary};
          color: ${colors.white};
          &:hover:not(:disabled) {
            background-color: #E64A2E;
          }
        `;
      case 'danger':
        return `
          background-color: ${colors.danger};
          color: ${colors.white};
          &:hover:not(:disabled) {
            background-color: #D32F3F;
          }
        `;
      case 'ghost':
        return `
          background-color: transparent;
          color: ${colors.text};
          border: 1px solid ${colors.border};
          &:hover:not(:disabled) {
            background-color: ${colors.background};
          }
        `;
      default:
        return `
          background-color: ${colors.primary};
          color: ${colors.white};
          &:hover:not(:disabled) {
            background-color: ${colors.primaryHover};
          }
        `;
    }
  }}

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &:active:not(:disabled) {
    transform: scale(0.98);
  }
`;

export const IconButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: none;
  background-color: ${colors.white};
  border: 1px solid ${colors.border};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;

  &:hover:not(:disabled) {
    background-color: ${colors.background};
  }

  &:active:not(:disabled) {
    transform: scale(0.95);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

// ========== Input Components ==========

export const Input = styled.input`
  padding: 12px 16px;
  font-size: 16px;
  border: 1px solid ${colors.border};
  border-radius: 6px;
  outline: none;
  transition: border-color 0.2s;
  background-color: ${colors.white};
  color: ${colors.text};
  width: 100%;

  &:focus {
    border-color: ${colors.primary};
  }

  &::placeholder {
    color: ${colors.textLight};
  }

  &:disabled {
    background-color: ${colors.background};
    cursor: not-allowed;
  }
`;

export const TextArea = styled.textarea`
  padding: 12px 16px;
  font-size: 14px;
  border: 1px solid ${colors.border};
  border-radius: 6px;
  outline: none;
  transition: border-color 0.2s;
  background-color: ${colors.white};
  color: ${colors.text};
  width: 100%;
  resize: vertical;
  min-height: 80px;
  font-family: inherit;

  &:focus {
    border-color: ${colors.primary};
  }

  &::placeholder {
    color: ${colors.textLight};
  }
`;

// ========== Card Components ==========

export const Card = styled.div`
  background-color: ${colors.white};
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 1px 3px ${colors.shadow};
  margin-bottom: 16px;
`;

export const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
`;

export const CardBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

// ========== Status Components ==========

export const Badge = styled.span<{ color?: 'success' | 'danger' | 'warning' | 'default' }>`
  display: inline-block;
  padding: 4px 12px;
  font-size: 12px;
  font-weight: 600;
  border-radius: 12px;

  ${(props) => {
    switch (props.color) {
      case 'success':
        return `
          background-color: ${colors.success}20;
          color: ${colors.success};
        `;
      case 'danger':
        return `
          background-color: ${colors.danger}20;
          color: ${colors.danger};
        `;
      case 'warning':
        return `
          background-color: ${colors.warning}20;
          color: ${colors.warning};
        `;
      default:
        return `
          background-color: ${colors.background};
          color: ${colors.textLight};
        `;
    }
  }}
`;

export const Spinner = styled.div`
  border: 3px solid ${colors.background};
  border-top: 3px solid ${colors.primary};
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
  margin: 20px auto;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

// ========== Grid & Flex ==========

export const Row = styled.div<{ gap?: number }>`
  display: flex;
  gap: ${(props) => props.gap || 12}px;
  align-items: center;
`;

export const Column = styled.div<{ gap?: number }>`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.gap || 12}px;
`;

export const Spacer = styled.div<{ size?: number }>`
  height: ${(props) => props.size || 16}px;
`;

// ========== Text Components ==========

export const Text = styled.p<{ size?: number; color?: string; weight?: number }>`
  margin: 0;
  font-size: ${(props) => props.size || 14}px;
  color: ${(props) => props.color || colors.text};
  font-weight: ${(props) => props.weight || 400};
`;

export const Link = styled.a`
  color: ${colors.primary};
  text-decoration: none;
  font-size: 14px;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

// ========== Alert Component ==========

export const Alert = styled.div<{ variant?: 'info' | 'success' | 'warning' | 'danger' }>`
  padding: 12px 16px;
  border-radius: 6px;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 12px;

  ${(props) => {
    switch (props.variant) {
      case 'success':
        return `
          background-color: ${colors.success}20;
          color: ${colors.success};
          border-left: 4px solid ${colors.success};
        `;
      case 'warning':
        return `
          background-color: ${colors.warning}20;
          color: #856404;
          border-left: 4px solid ${colors.warning};
        `;
      case 'danger':
        return `
          background-color: ${colors.danger}20;
          color: ${colors.danger};
          border-left: 4px solid ${colors.danger};
        `;
      default:
        return `
          background-color: ${colors.primary}20;
          color: ${colors.primary};
          border-left: 4px solid ${colors.primary};
        `;
    }
  }}
`;

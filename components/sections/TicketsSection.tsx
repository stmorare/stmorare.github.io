'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { SectionHeader } from '../ui/SectionHeader';
import { Badge } from '../ui/Badge';
import { Card } from '../ui/Card';
import {
  FileSpreadsheet,
  Maximize2,
  X,
  Search,
  CheckCircle2,
  ExternalLink,
  Table,
  Layers,
  Clock,
  Download,
  Building2,
} from 'lucide-react';

interface ExcelTicketRow {
  ticketNumber: string;
  title: string;
  account: string;
  queue?: string;
  createdBy?: string;
  assignee: string;
  priority: string;
  status?: string;
  issueType: string;
  type: string;
  subIssueType?: string;
}

interface LegacyTicketRow {
  ticketId: string;
  client: string;
  priority: 'Critical' | 'High' | 'Medium' | 'Low';
  subject: string;
  resolution: string;
  sla: 'Met' | 'Within SLA';
  duration: string;
}

interface TicketItem {
  id: string;
  title: string;
  category: string;
  fileName: string;
  imageSrc: string;
  clientName?: string;
  description: string;
  highlights: string[];
  tools: string[];
  excelRows?: ExcelTicketRow[];
  sampleRows?: LegacyTicketRow[];
}

const CATCH_22_ROWS: ExcelTicketRow[] = [
  {
    ticketNumber: '524919',
    title: 'Admin rights required.',
    account: 'Catch 22',
    queue: 'Service Desk',
    createdBy: 'Simphiwe Morare',
    assignee: 'Simphiwe Morare',
    priority: 'P5; Service Request',
    issueType: 'Access',
    type: 'Service Request',
    subIssueType: 'Access Permissions',
  },
  {
    ticketNumber: '525276',
    title: 'Password Reset',
    account: 'Catch 22',
    queue: 'Service Desk',
    createdBy: 'Simphiwe Morare',
    assignee: 'Simphiwe Morare',
    priority: 'P4; Low',
    issueType: 'Access',
    type: 'Incident',
    subIssueType: 'Password Reset',
  },
  {
    ticketNumber: '525283',
    title: 'FW: Enquiry',
    account: 'Catch 22',
    queue: 'Service Desk',
    createdBy: 'IT Help-Desk',
    assignee: 'Simphiwe Morare',
    priority: 'P4; Low',
    issueType: 'Email',
    type: 'Incident',
    subIssueType: 'Mimecast',
  },
  {
    ticketNumber: '526459',
    title: 'Password Reset',
    account: 'Catch 22',
    queue: 'Service Desk',
    createdBy: 'Simphiwe Morare',
    assignee: 'Simphiwe Morare',
    priority: 'P4; Low',
    issueType: 'Access',
    type: 'Service Request',
    subIssueType: 'Password Reset',
  },
  {
    ticketNumber: '526518',
    title: 'FW: Vincere',
    account: 'Catch 22',
    queue: 'Service Desk',
    createdBy: 'Simon Aspinall',
    assignee: 'Simphiwe Morare',
    priority: 'P4; Low',
    issueType: 'NOT CATEGORISED',
    type: 'Incident',
    subIssueType: '—',
  },
  {
    ticketNumber: '527719',
    title: 'FW: Leeds inbox',
    account: 'Catch 22',
    queue: 'Service Desk',
    createdBy: 'IT Help-Desk',
    assignee: 'Simphiwe Morare',
    priority: 'P4; Low',
    issueType: 'Email',
    type: 'Incident',
    subIssueType: 'Outlook',
  },
  {
    ticketNumber: '530352',
    title: 'Outlook',
    account: 'Catch 22',
    queue: 'Service Desk',
    createdBy: 'Simphiwe Morare',
    assignee: 'Simphiwe Morare',
    priority: 'P4; Low',
    issueType: 'Software',
    type: 'Incident',
    subIssueType: 'Microsoft Outlook',
  },
  {
    ticketNumber: '530551',
    title: 'FW: Pictures not downloading',
    account: 'Catch 22',
    queue: 'Service Desk',
    createdBy: 'IT Help-Desk',
    assignee: 'Simphiwe Morare',
    priority: 'P4; Low',
    issueType: 'Software',
    type: 'Service Request',
    subIssueType: 'Outlook',
  },
  {
    ticketNumber: '531614',
    title: 'Password reset - RDP',
    account: 'Catch 22',
    queue: 'Service Desk',
    createdBy: 'Aimee Walker',
    assignee: 'Simphiwe Morare',
    priority: 'P4; Low',
    issueType: 'Access',
    type: 'Service Request',
    subIssueType: 'Password Reset',
  },
  {
    ticketNumber: '531730',
    title: 'FW: New Starters x 2; start Monday 14th',
    account: 'Catch 22',
    queue: 'Service Desk',
    createdBy: 'IT Help-Desk',
    assignee: 'Simphiwe Morare',
    priority: 'P4; Low',
    issueType: 'Access',
    type: 'Service Request',
    subIssueType: 'New User - AD and Mail',
  },
  {
    ticketNumber: '531731',
    title: 'New Starters x 2; start Monday 14th',
    account: 'Catch 22',
    queue: 'Service Desk',
    createdBy: 'IT Help-Desk',
    assignee: 'Simphiwe Morare',
    priority: 'P4; Low',
    issueType: 'Access',
    type: 'Service Request',
    subIssueType: 'New User - AD and Mail',
  },
  {
    ticketNumber: '532040',
    title: 'Mimecast sync failing - shows as suspended',
    account: 'Catch 22',
    queue: 'Service Desk',
    createdBy: 'Adam Falkingham',
    assignee: 'Simphiwe Morare',
    priority: 'P4; Low',
    issueType: 'Email',
    type: 'Incident',
    subIssueType: 'Mimecast',
  },
  {
    ticketNumber: '532204',
    title: 'Software Installation',
    account: 'Catch 22',
    queue: 'Service Desk',
    createdBy: 'Simphiwe Morare',
    assignee: 'Simphiwe Morare',
    priority: 'P5; Service Request',
    issueType: 'Software',
    type: 'Service Request',
    subIssueType: 'Other',
  },
  {
    ticketNumber: '532246',
    title: 'N/A',
    account: 'Catch 22',
    queue: 'Service Desk',
    createdBy: 'Simon Aspinall',
    assignee: 'Simphiwe Morare',
    priority: 'P4; Low',
    issueType: 'NOT CATEGORISED',
    type: 'Incident',
    subIssueType: '—',
  },
  {
    ticketNumber: '532499',
    title: 'Cloud Call',
    account: 'Catch 22',
    queue: 'Service Desk',
    createdBy: 'Simphiwe Morare',
    assignee: 'Simphiwe Morare',
    priority: 'P5; Service Request',
    issueType: 'Software',
    type: 'Service Request',
    subIssueType: 'Other',
  },
  {
    ticketNumber: '532823',
    title: 'Leeds inbox',
    account: 'Catch 22',
    queue: 'Service Desk',
    createdBy: 'Aimee Walker',
    assignee: 'Simphiwe Morare',
    priority: 'P4; Low',
    issueType: 'Email',
    type: 'Incident',
    subIssueType: 'Outlook',
  },
  {
    ticketNumber: '532828',
    title: 'CATCH 22 (C22): [Warning ended (no packet loss)]',
    account: 'Catch 22',
    queue: 'Alerts',
    createdBy: 'Api',
    assignee: 'Simphiwe Morare',
    priority: 'P4; Low',
    issueType: 'Alerts - PRTG',
    type: 'Incident',
    subIssueType: '—',
  },
  {
    ticketNumber: '532920',
    title: 'Email forwarding - Urgent',
    account: 'Catch 22',
    queue: 'Service Desk',
    createdBy: 'Laura Obiedzinski',
    assignee: 'Simphiwe Morare',
    priority: 'P4; Low',
    issueType: 'NOT CATEGORISED',
    type: 'Incident',
    subIssueType: '—',
  },
  {
    ticketNumber: '533017',
    title: 'Block someone',
    account: 'Catch 22',
    queue: 'Service Desk',
    createdBy: 'Jake Newlove',
    assignee: 'Simphiwe Morare',
    priority: 'P4; Low',
    issueType: 'Email',
    type: 'Service Request',
    subIssueType: 'Exchange Online',
  },
  {
    ticketNumber: '533414',
    title: 'Email forwarding - TURN OFF PLEASE',
    account: 'Catch 22',
    queue: 'Service Desk',
    createdBy: 'Laura Obiedzinski',
    assignee: 'Simphiwe Morare',
    priority: 'P4; Low',
    issueType: 'Email',
    type: 'Service Request',
    subIssueType: 'Exchange Online',
  },
  {
    ticketNumber: '533564',
    title: 'Issue - opening off downloaded attachment',
    account: 'Catch 22',
    queue: 'Service Desk',
    createdBy: 'Jeanette Brown',
    assignee: 'Simphiwe Morare',
    priority: 'P4; Low',
    issueType: 'NOT CATEGORISED',
    type: 'Incident',
    subIssueType: '—',
  },
  {
    ticketNumber: '533991',
    title: "Can't connect to the Internet",
    account: 'Catch 22',
    queue: 'Service Desk',
    createdBy: 'Simphiwe Morare',
    assignee: 'Simphiwe Morare',
    priority: 'P4; Low',
    issueType: 'Network',
    type: 'Incident',
    subIssueType: 'Network Access',
  },
  {
    ticketNumber: '534882',
    title: 'Access to Linda Stone Catch 22 email',
    account: 'Catch 22',
    queue: 'Service Desk',
    createdBy: 'Jeanette Brown',
    assignee: 'Simphiwe Morare',
    priority: 'P4; Low',
    issueType: 'Email',
    type: 'Service Request',
    subIssueType: 'Exchange Online',
  },
  {
    ticketNumber: '535131',
    title: 'Bluetooth Headsets',
    account: 'Catch 22',
    queue: 'Service Desk',
    createdBy: 'Simphiwe Morare',
    assignee: 'Simphiwe Morare',
    priority: 'P4; Low',
    issueType: 'Personal Computer',
    type: 'Incident',
    subIssueType: 'Sound / Audio',
  },
  {
    ticketNumber: '535437',
    title: 'Cloudcall Setup',
    account: 'Catch 22',
    queue: 'Service Desk',
    createdBy: 'Sohail Amin',
    assignee: 'Simphiwe Morare',
    priority: 'P4; Low',
    issueType: 'Software',
    type: 'Incident',
    subIssueType: 'Other',
  },
];

const FLANNERY_ROWS: ExcelTicketRow[] = [
  {
    ticketNumber: '528276',
    title: 'Flannery (FLA): [Warning] FLACDV02 - FI',
    account: 'Flannery Civil Engineering',
    queue: 'Alerts',
    createdBy: 'Simphiwe Morare',
    assignee: 'Simphiwe Morare',
    priority: 'P4; Low',
    issueType: 'Alerts - PRTG',
    type: 'Incident',
    subIssueType: '—',
  },
  {
    ticketNumber: '530733',
    title: 'Uninstall Programs',
    account: 'Flannery Civil Engineering',
    queue: 'Service Desk',
    createdBy: 'Simphiwe Morare',
    assignee: 'Simphiwe Morare',
    priority: 'P4; Low',
    issueType: 'Software',
    type: 'Service Request',
    subIssueType: '—',
  },
  {
    ticketNumber: '531012',
    title: 'Nick Horne Account',
    account: 'Flannery Civil Engineering',
    queue: 'Service Desk',
    createdBy: 'Simphiwe Morare',
    assignee: 'Simphiwe Morare',
    priority: 'P4; Low',
    issueType: 'Access',
    type: 'Incident',
    subIssueType: '—',
  },
  {
    ticketNumber: '532897',
    title: "Can't find the Excel file on the Machine",
    account: 'Flannery Civil Engineering',
    queue: 'Service Desk',
    createdBy: 'Simphiwe Morare',
    assignee: 'Simphiwe Morare',
    priority: 'P5; Service Request',
    issueType: 'Access',
    type: 'Service Request',
    subIssueType: '—',
  },
  {
    ticketNumber: '534019',
    title: 'Reset Password',
    account: 'Flannery Civil Engineering',
    queue: 'Service Desk',
    createdBy: 'Simphiwe Morare',
    assignee: 'Simphiwe Morare',
    priority: 'P4; Low',
    issueType: 'Access',
    type: 'Service Request',
    subIssueType: '—',
  },
  {
    ticketNumber: '534065',
    title: 'Email Forwarding',
    account: 'Flannery Civil Engineering',
    queue: 'Service Desk',
    createdBy: 'Simphiwe Morare',
    assignee: 'Simphiwe Morare',
    priority: 'P4; Low',
    issueType: 'Email',
    type: 'Service Request',
    subIssueType: '—',
  },
  {
    ticketNumber: '535540',
    title: 'Message in Mimecast',
    account: 'Flannery Civil Engineering',
    queue: 'Service Desk',
    createdBy: 'Simphiwe Morare',
    assignee: 'Simphiwe Morare',
    priority: 'P4; Low',
    issueType: 'Email',
    type: 'Incident',
    subIssueType: '—',
  },
  {
    ticketNumber: '537401',
    title: 'Printer Installation.',
    account: 'Flannery Civil Engineering',
    queue: 'Service Desk',
    createdBy: 'Simphiwe Morare',
    assignee: 'Simphiwe Morare',
    priority: 'P4; Low',
    issueType: 'Printer/Scanner',
    type: 'Service Request',
    subIssueType: '—',
  },
];

const FUSION_ROWS: ExcelTicketRow[] = [
  {
    ticketNumber: '525539',
    title: 'Vulnerabilities have public disclosed exploit notification',
    account: 'Fusion 2K Limited',
    assignee: 'Simphiwe Morare',
    priority: 'P4; Low',
    status: 'Merged',
    issueType: 'NOT CATEGORISED',
    type: 'Service Request',
    subIssueType: '—',
  },
  {
    ticketNumber: '525677',
    title: 'Vulnerabilities have public disclosed exploit notification',
    account: 'Fusion 2K Limited',
    assignee: 'Simphiwe Morare',
    priority: 'P4; Low',
    status: 'Merged',
    issueType: 'Microsoft 365',
    type: 'Incident',
    subIssueType: '—',
  },
  {
    ticketNumber: '525715',
    title: 'Spanning Backup for Office 365 - Daily Backup Summary',
    account: 'Fusion 2K Limited',
    assignee: 'Simphiwe Morare',
    priority: 'P4; Low',
    status: 'Merged',
    issueType: 'Daily Checks & Reports',
    type: 'Problem',
    subIssueType: 'Italik Internal',
  },
  {
    ticketNumber: '525718',
    title: 'Vulnerabilities have public disclosed exploit notification',
    account: 'Fusion 2K Limited',
    assignee: 'Simphiwe Morare',
    priority: 'P4; Low',
    status: 'Merged',
    issueType: 'Microsoft 365',
    type: 'Incident',
    subIssueType: 'Other',
  },
  {
    ticketNumber: '525719',
    title: 'Vulnerabilities have verified exploit notification from Micr',
    account: 'Fusion 2K Limited',
    assignee: 'Simphiwe Morare',
    priority: 'P4; Low',
    status: 'Merged',
    issueType: 'Microsoft 365',
    type: 'Incident',
    subIssueType: 'Other',
  },
  {
    ticketNumber: '525726',
    title: 'Spanning Backup for Office 365 - Daily Backup Summary',
    account: 'Fusion 2K Limited',
    assignee: 'Simphiwe Morare',
    priority: 'P4; Low',
    status: 'Completed',
    issueType: 'Daily Checks & Reports',
    type: 'Problem',
    subIssueType: 'Italik Internal',
  },
  {
    ticketNumber: '525760',
    title: 'Lisa Chambers has issues creating team meetings',
    account: 'Fusion 2K Limited',
    assignee: 'Simphiwe Morare',
    priority: 'P4; Low',
    status: 'Completed',
    issueType: 'NOT CATEGORISED',
    type: 'Incident',
    subIssueType: '—',
  },
  {
    ticketNumber: '527001',
    title: 'Chrome / Intranet access',
    account: 'Fusion 2K Limited',
    assignee: 'Simphiwe Morare',
    priority: 'P4; Low',
    status: 'Completed',
    issueType: 'NOT CATEGORISED',
    type: 'Incident',
    subIssueType: '—',
  },
  {
    ticketNumber: '527528',
    title: 'Renault Email Inbox',
    account: 'Fusion 2K Limited',
    assignee: 'Simphiwe Morare',
    priority: 'P4; Low',
    status: 'Completed',
    issueType: 'Microsoft 365',
    type: 'Incident',
    subIssueType: 'Login Issue',
  },
  {
    ticketNumber: '527724',
    title: 'Snipping Tool / Captured Snips',
    account: 'Fusion 2K Limited',
    assignee: 'Simphiwe Morare',
    priority: 'P4; Low',
    status: 'Completed',
    issueType: 'Software',
    type: 'Incident',
    subIssueType: 'Other',
  },
  {
    ticketNumber: '527904',
    title: 'Memory Integrity',
    account: 'Fusion 2K Limited',
    assignee: 'Simphiwe Morare',
    priority: 'P4; Low',
    status: 'Completed',
    issueType: 'Security',
    type: 'Incident',
    subIssueType: 'Vulnerability Mitigation',
  },
  {
    ticketNumber: '528097',
    title: 'Faye Hughes is trying to reach you in Microsoft Teams',
    account: 'Fusion 2K Limited',
    assignee: 'Simphiwe Morare',
    priority: 'P5; Service Request',
    status: 'Completed',
    issueType: 'Software',
    type: 'Service Request',
    subIssueType: 'Microsoft Teams',
  },
  {
    ticketNumber: '528098',
    title: 'Excel Not Responding',
    account: 'Fusion 2K Limited',
    assignee: 'Simphiwe Morare',
    priority: 'P4; Low',
    status: 'Completed',
    issueType: 'Software',
    type: 'Incident',
    subIssueType: 'Microsoft Excel',
  },
  {
    ticketNumber: '528541',
    title: 'RE: Welcome to iCloud',
    account: 'Fusion 2K Limited',
    assignee: 'Simphiwe Morare',
    priority: 'P4; Low',
    status: 'Completed',
    issueType: 'Software',
    type: 'Incident',
    subIssueType: 'Other',
  },
  {
    ticketNumber: '529279',
    title: 'Teams not responding',
    account: 'Fusion 2K Limited',
    assignee: 'Simphiwe Morare',
    priority: 'P4; Low',
    status: 'Completed',
    issueType: 'Software',
    type: 'Incident',
    subIssueType: 'Microsoft Teams',
  },
  {
    ticketNumber: '532093',
    title: 'Language settings',
    account: 'Fusion 2K Limited',
    assignee: 'Simphiwe Morare',
    priority: 'P4; Low',
    status: 'Completed',
    issueType: 'Personal Computer',
    type: 'Service Request',
    subIssueType: 'Other',
  },
  {
    ticketNumber: '533243',
    title: '** Resolved ** Georgia required access to support@nmg',
    account: 'Fusion 2K Limited',
    assignee: 'Simphiwe Morare',
    priority: 'P4; Low',
    status: 'Completed',
    issueType: 'NOT CATEGORISED',
    type: 'Incident',
    subIssueType: '—',
  },
  {
    ticketNumber: '533255',
    title: 'Laptop issues',
    account: 'Fusion 2K Limited',
    assignee: 'Simphiwe Morare',
    priority: 'P4; Low',
    status: 'Completed',
    issueType: 'NOT CATEGORISED',
    type: 'Incident',
    subIssueType: '—',
  },
  {
    ticketNumber: '535979',
    title: 'Teams Headset no sound',
    account: 'Fusion 2K Limited',
    assignee: 'Simphiwe Morare',
    priority: 'P4; Low',
    status: 'Completed',
    issueType: 'Personal Computer',
    type: 'Incident',
    subIssueType: 'Peripherals',
  },
  {
    ticketNumber: '536400',
    title: 'Adding Email Inbox',
    account: 'Fusion 2K Limited',
    assignee: 'Simphiwe Morare',
    priority: 'P4; Low',
    status: 'Completed',
    issueType: 'Email',
    type: 'Incident',
    subIssueType: 'Outlook',
  },
  {
    ticketNumber: '537296',
    title: 'Excel SS are not opening / blank',
    account: 'Fusion 2K Limited',
    assignee: 'Simphiwe Morare',
    priority: 'P4; Low',
    status: 'Completed',
    issueType: 'Software',
    type: 'Incident',
    subIssueType: 'Microsoft Excel',
  },
  {
    ticketNumber: '537659',
    title: 'New starters - shared email inboxes',
    account: 'Fusion 2K Limited',
    assignee: 'Simphiwe Morare',
    priority: 'P4; Low',
    status: 'Completed',
    issueType: 'Email',
    type: 'Incident',
    subIssueType: 'Outlook',
  },
  {
    ticketNumber: '537837',
    title: 'Software install - filezilla',
    account: 'Fusion 2K Limited',
    assignee: 'Simphiwe Morare',
    priority: 'P4; Low',
    status: 'Completed',
    issueType: 'Software',
    type: 'Service Request',
    subIssueType: 'Other',
  },
  {
    ticketNumber: '538203',
    title: 'Software installs',
    account: 'Fusion 2K Limited',
    assignee: 'Simphiwe Morare',
    priority: 'P4; Low',
    status: 'Completed',
    issueType: 'Software',
    type: 'Incident',
    subIssueType: 'Other',
  },
  {
    ticketNumber: '538917',
    title: '** Resolved **',
    account: 'Fusion 2K Limited',
    assignee: 'Simphiwe Morare',
    priority: 'P4; Low',
    status: 'Completed',
    issueType: 'NOT CATEGORISED',
    type: 'Incident',
    subIssueType: '—',
  },
];

const JEREMY_WOOD_ROWS: ExcelTicketRow[] = [
  {
    ticketNumber: '524774',
    title: 'Intermittent mail signature disappearance',
    account: 'Jeremy Wood Kitchens',
    queue: 'Service Desk',
    createdBy: 'Graham Wood',
    assignee: 'Simphiwe Morare',
    priority: 'P4; Low',
    issueType: 'NOT CATEGORISED',
    type: 'Incident',
    subIssueType: '—',
  },
  {
    ticketNumber: '525173',
    title: 'Access',
    account: 'Jeremy Wood Kitchens',
    queue: 'Service Desk',
    createdBy: 'Simphiwe Morare',
    assignee: 'Simphiwe Morare',
    priority: 'P5; Service Request',
    issueType: 'Access',
    type: 'Service Request',
    subIssueType: 'Password Reset',
  },
  {
    ticketNumber: '525433',
    title: 'FW: For the attention of Jeremy',
    account: 'Jeremy Wood Kitchens',
    queue: 'Service Desk',
    createdBy: 'Sharon Perrett',
    assignee: 'Simphiwe Morare',
    priority: 'P4; Low',
    issueType: 'Email',
    type: 'Incident',
    subIssueType: 'Mimecast',
  },
  {
    ticketNumber: '527907',
    title: 'Storage Queries & other bits',
    account: 'Jeremy Wood Kitchens',
    queue: 'Service Desk',
    createdBy: 'Sharon Perrett',
    assignee: 'Simphiwe Morare',
    priority: 'P4; Low',
    issueType: 'Server',
    type: 'Service Request',
    subIssueType: 'Disk Space',
  },
  {
    ticketNumber: '529277',
    title: 'Delegate Access',
    account: 'Jeremy Wood Kitchens',
    queue: 'Service Desk',
    createdBy: 'Sharon Perrett',
    assignee: 'Simphiwe Morare',
    priority: 'P4; Low',
    issueType: 'Microsoft 365',
    type: 'Service Request',
    subIssueType: 'Exchange Online',
  },
  {
    ticketNumber: '529323',
    title: 'Password Reset.',
    account: 'Jeremy Wood Kitchens',
    queue: 'Service Desk',
    createdBy: 'Simphiwe Morare',
    assignee: 'Simphiwe Morare',
    priority: 'P5; Service Request',
    issueType: 'Access',
    type: 'Service Request',
    subIssueType: 'Password Reset',
  },
  {
    ticketNumber: '529384',
    title: 'Outlook',
    account: 'Jeremy Wood Kitchens',
    queue: 'Service Desk',
    createdBy: 'Simphiwe Morare',
    assignee: 'Simphiwe Morare',
    priority: 'P4; Low',
    issueType: 'Software',
    type: 'Incident',
    subIssueType: 'Outlook',
  },
  {
    ticketNumber: '530827',
    title: 'FW: A message triggered content policies',
    account: 'Jeremy Wood Kitchens',
    queue: 'Service Desk',
    createdBy: 'Sharon Perrett',
    assignee: 'Simphiwe Morare',
    priority: 'P4; Low',
    issueType: 'Alerts - Other',
    type: 'Service Request',
    subIssueType: 'Mimecast',
  },
  {
    ticketNumber: '530928',
    title: 'photos',
    account: 'Jeremy Wood Kitchens',
    queue: 'Service Desk',
    createdBy: 'Graham Wood',
    assignee: 'Simphiwe Morare',
    priority: 'P4; Low',
    issueType: 'Personal Computer',
    type: 'Service Request',
    subIssueType: 'Peripherals',
  },
  {
    ticketNumber: '530933',
    title: 'Adobe standard not acrobat',
    account: 'Jeremy Wood Kitchens',
    queue: 'Service Desk',
    createdBy: 'Graham Wood',
    assignee: 'Simphiwe Morare',
    priority: 'P4; Low',
    issueType: 'Software',
    type: 'Service Request',
    subIssueType: 'PDF Viewer',
  },
  {
    ticketNumber: '531645',
    title: 'PDF Reader',
    account: 'Jeremy Wood Kitchens',
    queue: 'Service Desk',
    createdBy: 'Simphiwe Morare',
    assignee: 'Simphiwe Morare',
    priority: 'P5; Service Request',
    issueType: 'Software',
    type: 'Service Request',
    subIssueType: 'PDF Viewer',
  },
  {
    ticketNumber: '532346',
    title: 'Password Reset',
    account: 'Jeremy Wood Kitchens',
    queue: 'Service Desk',
    createdBy: 'Simphiwe Morare',
    assignee: 'Simphiwe Morare',
    priority: 'P5; Service Request',
    issueType: 'Access',
    type: 'Service Request',
    subIssueType: 'Password Reset',
  },
  {
    ticketNumber: '532917',
    title: 'Held Messages',
    account: 'Jeremy Wood Kitchens',
    queue: 'Service Desk',
    createdBy: 'Simphiwe Morare',
    assignee: 'Simphiwe Morare',
    priority: 'P4; Low',
    issueType: 'Email',
    type: 'Incident',
    subIssueType: 'Mimecast',
  },
  {
    ticketNumber: '533268',
    title: 'Mimecast - Held Messages',
    account: 'Jeremy Wood Kitchens',
    queue: 'Service Desk',
    createdBy: 'Simphiwe Morare',
    assignee: 'Simphiwe Morare',
    priority: 'P4; Low',
    issueType: 'Email',
    type: 'Service Request',
    subIssueType: 'Mimecast',
  },
  {
    ticketNumber: '533363',
    title: 'Mimecast',
    account: 'Jeremy Wood Kitchens',
    queue: 'Service Desk',
    createdBy: 'Sharon Perrett',
    assignee: 'Simphiwe Morare',
    priority: 'P4; Low',
    issueType: 'NOT CATEGORISED',
    type: 'Incident',
    subIssueType: '—',
  },
  {
    ticketNumber: '533745',
    title: 'Password Reset',
    account: 'Jeremy Wood Kitchens',
    queue: 'Service Desk',
    createdBy: 'Simphiwe Morare',
    assignee: 'Simphiwe Morare',
    priority: 'P4; Low',
    issueType: 'Access',
    type: 'Incident',
    subIssueType: 'Password Reset',
  },
  {
    ticketNumber: '533864',
    title: 'Password Reset',
    account: 'Jeremy Wood Kitchens',
    queue: 'Service Desk',
    createdBy: 'Simphiwe Morare',
    assignee: 'Simphiwe Morare',
    priority: 'P4; Low',
    issueType: 'Access',
    type: 'Incident',
    subIssueType: 'Password Reset',
  },
  {
    ticketNumber: '533956',
    title: 'Password Reset For Graham Wood',
    account: 'Jeremy Wood Kitchens',
    queue: 'Service Desk',
    createdBy: 'Simphiwe Morare',
    assignee: 'Simphiwe Morare',
    priority: 'P4; Low',
    issueType: 'Access',
    type: 'Incident',
    subIssueType: 'Password Reset',
  },
  {
    ticketNumber: '534067',
    title: 'Please release this message asap',
    account: 'Jeremy Wood Kitchens',
    queue: 'Service Desk',
    createdBy: 'Sharon Perrett',
    assignee: 'Simphiwe Morare',
    priority: 'P4; Low',
    issueType: 'Email',
    type: 'Incident',
    subIssueType: 'Mimecast',
  },
  {
    ticketNumber: '534305',
    title: 'Password Reset',
    account: 'Jeremy Wood Kitchens',
    queue: 'Service Desk',
    createdBy: 'Simphiwe Morare',
    assignee: 'Simphiwe Morare',
    priority: 'P4; Low',
    issueType: 'Access',
    type: 'Incident',
    subIssueType: 'Password Reset',
  },
  {
    ticketNumber: '535977',
    title: 'Printing - Karina Jeremy Wood',
    account: 'Jeremy Wood Kitchens',
    queue: 'Service Desk',
    createdBy: 'Karina Ripley',
    assignee: 'Simphiwe Morare',
    priority: 'P4; Low',
    issueType: 'Email',
    type: 'Incident',
    subIssueType: 'Outlook',
  },
  {
    ticketNumber: '540433',
    title: 'Pat Test',
    account: 'Jeremy Wood Kitchens',
    queue: 'Service Desk',
    createdBy: 'Simphiwe Morare',
    assignee: 'Simphiwe Morare',
    priority: 'P5; Service Request',
    issueType: 'NOT CATEGORISED',
    type: 'Service Request',
    subIssueType: '—',
  },
  {
    ticketNumber: '541506',
    title: 'Personal Computer',
    account: 'Jeremy Wood Kitchens',
    queue: 'Service Desk',
    createdBy: 'Simphiwe Morare',
    assignee: 'Simphiwe Morare',
    priority: 'P4; Low',
    issueType: 'Personal Computer',
    type: 'Incident',
    subIssueType: 'Logging On',
  },
  {
    ticketNumber: '542848',
    title: 'Google Chrome',
    account: 'Jeremy Wood Kitchens',
    queue: 'Service Desk',
    createdBy: 'Simphiwe Morare',
    assignee: 'Simphiwe Morare',
    priority: 'P4; Low',
    issueType: 'Software',
    type: 'Incident',
    subIssueType: 'Chrome',
  },
  {
    ticketNumber: '544665',
    title: 'Error message when trying to save JPEG files.',
    account: 'Jeremy Wood Kitchens',
    queue: 'Service Desk',
    createdBy: 'Simphiwe Morare',
    assignee: 'Simphiwe Morare',
    priority: 'P4; Low',
    issueType: 'Software',
    type: 'Incident',
    subIssueType: 'Windows Explorer',
  },
];

const NORTHERN_FELLS_ROWS: ExcelTicketRow[] = [
  {
    ticketNumber: '531408',
    title: 'Northern Fells Group Query',
    account: 'Northern Fells Group',
    queue: 'Service Desk',
    assignee: 'Simphiwe Morare',
    priority: 'P4; Low',
    issueType: 'Software',
    type: 'Service Request',
    subIssueType: 'Microsoft Outlook',
  },
  {
    ticketNumber: '531717',
    title: 'Lost Folder in Outlook',
    account: 'Northern Fells Group',
    queue: 'Service Desk',
    assignee: 'Simphiwe Morare',
    priority: 'P4; Low',
    issueType: 'Software',
    type: 'Incident',
    subIssueType: 'Outlook',
  },
  {
    ticketNumber: '532110',
    title: 'driver for home printer',
    account: 'Northern Fells Group',
    queue: 'Service Desk',
    assignee: 'Simphiwe Morare',
    priority: 'P4; Low',
    issueType: 'Printer/Scanner',
    type: 'Service Request',
    subIssueType: 'Hardware',
  },
  {
    ticketNumber: '532544',
    title: 'Outlook issue',
    account: 'Northern Fells Group',
    queue: 'Service Desk',
    assignee: 'Simphiwe Morare',
    priority: 'P4; Low',
    issueType: 'Software',
    type: 'Incident',
    subIssueType: 'Outlook',
  },
  {
    ticketNumber: '533332',
    title: 'lost email folder',
    account: 'Northern Fells Group',
    queue: 'Service Desk',
    assignee: 'Simphiwe Morare',
    priority: 'P4; Low',
    issueType: 'NOT CATEGORISED',
    type: 'Incident',
    subIssueType: 'Outlook',
  },
  {
    ticketNumber: '534304',
    title: 'Laptop issues',
    account: 'Northern Fells Group',
    queue: 'Service Desk',
    assignee: 'Simphiwe Morare',
    priority: 'P4; Low',
    issueType: 'Personal Computer',
    type: 'Incident',
    subIssueType: 'Network / Internet',
  },
  {
    ticketNumber: '536303',
    title: 'Personal One drive not showing in Explc',
    account: 'Northern Fells Group',
    queue: 'Service Desk',
    assignee: 'Simphiwe Morare',
    priority: 'P4; Low',
    issueType: 'Software',
    type: 'Incident',
    subIssueType: 'OneDrive',
  },
  {
    ticketNumber: '536346',
    title: "Simon Braithwaite's account",
    account: 'Northern Fells Group',
    queue: 'Service Desk',
    assignee: 'Simphiwe Morare',
    priority: 'P4; Low',
    issueType: 'Software',
    type: 'Incident',
    subIssueType: 'OneDrive',
  },
  {
    ticketNumber: '537166',
    title: 'FW: [Action Required] Re-grant access t',
    account: 'Northern Fells Group',
    queue: 'Service Desk',
    assignee: 'Simphiwe Morare',
    priority: 'P4; Low',
    issueType: 'Alerts - Other',
    type: 'Incident',
    subIssueType: 'Other',
  },
  {
    ticketNumber: '537716',
    title: 'Andrew Swainson account',
    account: 'Northern Fells Group',
    queue: 'Service Desk',
    assignee: 'Simphiwe Morare',
    priority: 'P4; Low',
    issueType: 'Access',
    type: 'Service Request',
    subIssueType: 'Other',
  },
  {
    ticketNumber: '538202',
    title: 'Sharing my contact details -urgent',
    account: 'Northern Fells Group',
    queue: 'Service Desk',
    assignee: 'Simphiwe Morare',
    priority: 'P4; Low',
    issueType: 'Microsoft 365',
    type: 'Incident',
    subIssueType: 'Exchange Online',
  },
  {
    ticketNumber: '539573',
    title: '***Laptop Power Failure***',
    account: 'Northern Fells Group',
    queue: 'Service Desk',
    assignee: 'Simphiwe Morare',
    priority: 'P4; Low',
    issueType: 'Personal Computer',
    type: 'Incident',
    subIssueType: 'Battery / Power',
  },
  {
    ticketNumber: '539957',
    title: 'access to google doc',
    account: 'Northern Fells Group',
    queue: 'Service Desk',
    assignee: 'Simphiwe Morare',
    priority: 'P4; Low',
    issueType: 'Access',
    type: 'Incident',
    subIssueType: 'Access Permissions - Folder / File',
  },
  {
    ticketNumber: '543846',
    title: "Link for Peter cannon's access to his em",
    account: 'Northern Fells Group',
    queue: 'Service Desk',
    assignee: 'Simphiwe Morare',
    priority: 'P4; Low',
    issueType: 'Access',
    type: 'Service Request',
    subIssueType: 'Access Permissions - Mailbox',
  },
];

const PALM_YORKSHIRE_ROWS: ExcelTicketRow[] = [
  {
    ticketNumber: '530834',
    title: 'New Starter - Ben Grinstead',
    account: 'Palm Yorkshire',
    queue: 'Service Desk',
    createdBy: 'Becky Wallace',
    assignee: 'Simphiwe Morare',
    priority: 'P4; Low',
    issueType: 'Access',
    type: 'Service Request',
    subIssueType: 'New User',
  },
  {
    ticketNumber: '530931',
    title: 'PalmYorkshire - PC',
    account: 'Palm Yorkshire',
    queue: 'Service Desk',
    createdBy: 'Simphiwe Morare',
    assignee: 'Simphiwe Morare',
    priority: 'P4; Low',
    issueType: 'Personal Computer',
    type: 'Incident',
    subIssueType: 'Drives / Folders',
  },
  {
    ticketNumber: '531642',
    title: 'VPN',
    account: 'Palm Yorkshire',
    queue: 'Service Desk',
    createdBy: 'Simphiwe Morare',
    assignee: 'Simphiwe Morare',
    priority: 'P4; Low',
    issueType: 'Network',
    type: 'Incident',
    subIssueType: 'VPN',
  },
  {
    ticketNumber: '536668',
    title: 'New Starter Set Up - Abbie Smith-Donalds',
    account: 'Palm Yorkshire',
    queue: 'Service Desk',
    createdBy: 'Becky Wallace',
    assignee: 'Simphiwe Morare',
    priority: 'P4; Low',
    issueType: 'Access',
    type: 'Service Request',
    subIssueType: 'New User - AD and Mail',
  },
  {
    ticketNumber: '539833',
    title: 'Jess Raimond - Outlook',
    account: 'Palm Yorkshire',
    queue: 'Service Desk',
    createdBy: 'Becky Wallace',
    assignee: 'Simphiwe Morare',
    priority: 'P4; Low',
    issueType: 'Email',
    type: 'Incident',
    subIssueType: 'Outlook',
  },
  {
    ticketNumber: '539859',
    title: 'Access to Shared Mailbox',
    account: 'Palm Yorkshire',
    queue: 'Service Desk',
    createdBy: 'Becky Wallace',
    assignee: 'Simphiwe Morare',
    priority: 'P4; Low',
    issueType: 'Access',
    type: 'Service Request',
    subIssueType: 'Access Permissions - Mailbox',
  },
  {
    ticketNumber: '543540',
    title: 'New Shared Mailbox - Diocese',
    account: 'Palm Yorkshire',
    queue: 'Service Desk',
    createdBy: 'Becky Wallace',
    assignee: 'Simphiwe Morare',
    priority: 'P4; Low',
    issueType: 'Microsoft 365',
    type: 'Service Request',
    subIssueType: 'Exchange Online',
  },
  {
    ticketNumber: '543541',
    title: 'New Shared Mailbox - WDH Voids',
    account: 'Palm Yorkshire',
    queue: 'Service Desk',
    createdBy: 'Becky Wallace',
    assignee: 'Simphiwe Morare',
    priority: 'P4; Low',
    issueType: 'Microsoft 365',
    type: 'Service Request',
    subIssueType: 'Exchange Online',
  },
  {
    ticketNumber: '543792',
    title: 'PC Issues / Mail Issues',
    account: 'Palm Yorkshire',
    queue: 'Service Desk',
    createdBy: 'Becky Wallace',
    assignee: 'Simphiwe Morare',
    priority: 'P4; Low',
    issueType: 'Personal Computer',
    type: 'Incident',
    subIssueType: 'Performance',
  },
  {
    ticketNumber: '544600',
    title: 'Leah from Palm Yorkshire - issue with he',
    account: 'Palm Yorkshire',
    queue: 'Service Desk',
    createdBy: 'Marlise Blake',
    assignee: 'Simphiwe Morare',
    priority: 'P4; Low',
    issueType: 'Email',
    type: 'Incident',
    subIssueType: 'Outlook',
  },
];

const SOLUTION_HOUSE_ROWS: ExcelTicketRow[] = [
  {
    ticketNumber: '527708',
    title: 'New Starter',
    account: 'THE SOLUTION HOUSE',
    queue: 'Service Desk',
    assignee: 'Simphiwe Morare',
    priority: 'P4; Low',
    issueType: 'Access',
    type: 'Service Request',
    subIssueType: 'New User - AD and Mail',
  },
  {
    ticketNumber: '528530',
    title: 'Onedrive Issue',
    account: 'THE SOLUTION HOUSE',
    queue: 'Service Desk',
    assignee: 'Simphiwe Morare',
    priority: 'P4; Low',
    issueType: 'Software',
    type: 'Incident',
    subIssueType: 'OneDrive',
  },
  {
    ticketNumber: '528961',
    title: 'printer permission issues',
    account: 'THE SOLUTION HOUSE',
    queue: 'Service Desk',
    assignee: 'Simphiwe Morare',
    priority: 'P4; Low',
    issueType: 'Printer/Scanner',
    type: 'Incident',
    subIssueType: 'Network',
  },
  {
    ticketNumber: '529326',
    title: 'TSH Cutting Machine',
    account: 'THE SOLUTION HOUSE',
    queue: 'Service Desk',
    assignee: 'Simphiwe Morare',
    priority: 'P4; Low',
    issueType: 'Server',
    type: 'Incident',
    subIssueType: 'Connectivity',
  },
  {
    ticketNumber: '530329',
    title: 'Warning: Please update your Meraki Cloud License',
    account: 'THE SOLUTION HOUSE',
    queue: 'Service Desk',
    assignee: 'Simphiwe Morare',
    priority: 'P4; Low',
    issueType: 'Alerts - Other',
    type: 'Incident',
    subIssueType: 'Meraki',
  },
  {
    ticketNumber: '531373',
    title: 'Re-connect Company Folder',
    account: 'THE SOLUTION HOUSE',
    queue: 'Service Desk',
    assignee: 'Simphiwe Morare',
    priority: 'P4; Low',
    issueType: 'Access',
    type: 'Incident',
    subIssueType: 'Access Permissions - Folder / File',
  },
  {
    ticketNumber: '531491',
    title: "Stuart's Emails",
    account: 'THE SOLUTION HOUSE',
    queue: 'Service Desk',
    assignee: 'Simphiwe Morare',
    priority: 'P4; Low',
    issueType: 'Microsoft 365',
    type: 'Service Request',
    subIssueType: 'Exchange Online',
  },
  {
    ticketNumber: '531566',
    title: 'Your Microsoft 365 Business Standard subscription is renewing soon',
    account: 'THE SOLUTION HOUSE',
    queue: 'Service Desk',
    assignee: 'Simphiwe Morare',
    priority: 'P4; Low',
    issueType: 'Microsoft 365',
    type: 'Service Request',
    subIssueType: 'Assign License',
  },
  {
    ticketNumber: '531567',
    title: 'Your Office 365 Extra File Storage subscription is renewing soon',
    account: 'THE SOLUTION HOUSE',
    queue: 'Service Desk',
    assignee: 'Simphiwe Morare',
    priority: 'P4; Low',
    issueType: 'Microsoft 365',
    type: 'Service Request',
    subIssueType: 'Assign License',
  },
  {
    ticketNumber: '531568',
    title: 'Your Microsoft 365 Business Basic subscription is renewing soon',
    account: 'THE SOLUTION HOUSE',
    queue: 'Service Desk',
    assignee: 'Simphiwe Morare',
    priority: 'P4; Low',
    issueType: 'Microsoft 365',
    type: 'Service Request',
    subIssueType: 'Assign License',
  },
  {
    ticketNumber: '532345',
    title: 'Company Folder',
    account: 'THE SOLUTION HOUSE',
    queue: 'Service Desk',
    assignee: 'Simphiwe Morare',
    priority: 'P5; Service Request',
    issueType: 'Access',
    type: 'Service Request',
    subIssueType: 'Access Permissions - Folder / File',
  },
  {
    ticketNumber: '532525',
    title: 'THE SOLUTION HOUSE (TSH): [Down ended (now: Warning)] TSH PRTG',
    account: 'THE SOLUTION HOUSE',
    queue: 'Alerts',
    assignee: 'Simphiwe Morare',
    priority: 'P4; Low',
    issueType: 'Alerts - PRTG',
    type: 'Incident',
    subIssueType: '—',
  },
  {
    ticketNumber: '533033',
    title: 'New Starter',
    account: 'THE SOLUTION HOUSE',
    queue: 'Service Desk',
    assignee: 'Simphiwe Morare',
    priority: 'P4; Low',
    issueType: 'Access',
    type: 'Service Request',
    subIssueType: 'New User - AD and Mail',
  },
  {
    ticketNumber: '533585',
    title: "Paul Smith's Account",
    account: 'THE SOLUTION HOUSE',
    queue: 'Service Desk',
    assignee: 'Simphiwe Morare',
    priority: 'P4; Low',
    issueType: 'Access',
    type: 'Incident',
    subIssueType: 'Password Reset',
  },
  {
    ticketNumber: '533633',
    title: 'You have renewed your Office 365 Extra File Storage subscription',
    account: 'THE SOLUTION HOUSE',
    queue: 'Service Desk',
    assignee: 'Simphiwe Morare',
    priority: 'P4; Low',
    issueType: 'Alerts - Other',
    type: 'Incident',
    subIssueType: 'Other',
  },
  {
    ticketNumber: '533921',
    title: 'FW: windows laptop',
    account: 'THE SOLUTION HOUSE',
    queue: 'Service Desk',
    assignee: 'Simphiwe Morare',
    priority: 'P4; Low',
    issueType: 'Access',
    type: 'Service Request',
    subIssueType: 'New User - AD and Mail',
  },
  {
    ticketNumber: '534086',
    title: 'Laptop Set up - The Solution House',
    account: 'THE SOLUTION HOUSE',
    queue: 'Service Desk',
    assignee: 'Simphiwe Morare',
    priority: 'P4; Low',
    issueType: 'Access',
    type: 'Service Request',
    subIssueType: 'New User',
  },
  {
    ticketNumber: '534103',
    title: 'The Solution House - Microsoft Business Premium - New License',
    account: 'THE SOLUTION HOUSE',
    queue: 'Service Desk',
    assignee: 'Simphiwe Morare',
    priority: 'P4; Low',
    issueType: 'Access',
    type: 'Service Request',
    subIssueType: 'New User',
  },
  {
    ticketNumber: '534322',
    title: 'TSH Team Site Docs',
    account: 'THE SOLUTION HOUSE',
    queue: 'Service Desk',
    assignee: 'Simphiwe Morare',
    priority: 'P4; Low',
    issueType: 'Access',
    type: 'Service Request',
    subIssueType: 'Access Permissions - Site',
  },
  {
    ticketNumber: '535112',
    title: 'New Dell Laptop',
    account: 'THE SOLUTION HOUSE',
    queue: 'Service Desk',
    assignee: 'Simphiwe Morare',
    priority: 'P4; Low',
    issueType: 'Personal Computer',
    type: 'Service Request',
    subIssueType: 'New Computer',
  },
  {
    ticketNumber: '535221',
    title: 'TSH Cutting Machine PC',
    account: 'THE SOLUTION HOUSE',
    queue: 'Service Desk',
    assignee: 'Simphiwe Morare',
    priority: 'P4; Low',
    issueType: 'Access',
    type: 'Incident',
    subIssueType: 'Access Permissions - Folder / File',
  },
  {
    ticketNumber: '535840',
    title: 'Ice Administrator has gone stale',
    account: 'THE SOLUTION HOUSE',
    queue: 'Service Desk',
    assignee: 'Simphiwe Morare',
    priority: 'P4; Low',
    issueType: 'NOT CATEGORISED',
    type: 'Incident',
    subIssueType: '—',
  },
  {
    ticketNumber: '535988',
    title: 'Adobe Install',
    account: 'THE SOLUTION HOUSE',
    queue: 'Service Desk',
    assignee: 'Simphiwe Morare',
    priority: 'P5; Service Request',
    issueType: 'Software',
    type: 'Service Request',
    subIssueType: 'Other',
  },
  {
    ticketNumber: '537173',
    title: 'New Starter',
    account: 'THE SOLUTION HOUSE',
    queue: 'Service Desk',
    assignee: 'Simphiwe Morare',
    priority: 'P4; Low',
    issueType: 'Access',
    type: 'Incident',
    subIssueType: 'New User - AD and Mail',
  },
  {
    ticketNumber: '537203',
    title: 'Second new starter',
    account: 'THE SOLUTION HOUSE',
    queue: 'Service Desk',
    assignee: 'Simphiwe Morare',
    priority: 'P4; Low',
    issueType: 'Access',
    type: 'Incident',
    subIssueType: 'New User - AD and Mail',
  },
];

const UHY_ROWS: ExcelTicketRow[] = [
  {
    ticketNumber: '523928',
    title: 'UHY CALVERT SMITH (UHY): [Down] Environment Monitor',
    account: 'UHY Calvert Smith',
    queue: 'Service Desk',
    createdBy: 'Api',
    assignee: 'Simphiwe Morare',
    priority: 'P4; Low',
    issueType: 'Alerts - PRTG',
    type: 'Service Request',
    subIssueType: 'Probe Device',
  },
  {
    ticketNumber: '524740',
    title: 'New UHY user Shivani Solanki - see requested details.',
    account: 'UHY Calvert Smith',
    queue: 'Service Desk',
    createdBy: 'Adam Falkingham',
    assignee: 'Simphiwe Morare',
    priority: 'P4; Low',
    issueType: 'Access',
    type: 'Service Request',
    subIssueType: 'New User - AD and Mail',
  },
  {
    ticketNumber: '524741',
    title: 'Email - the uhy-york.com address',
    account: 'UHY Calvert Smith',
    queue: 'Service Desk',
    createdBy: 'Hayden Priest',
    assignee: 'Simphiwe Morare',
    priority: 'P4; Low',
    issueType: 'Software',
    type: 'Service Request',
    subIssueType: 'Other',
  },
  {
    ticketNumber: '524859',
    title: 'Odd popup',
    account: 'UHY Calvert Smith',
    queue: 'Service Desk',
    createdBy: 'Hayden Priest',
    assignee: 'Simphiwe Morare',
    priority: 'P4; Low',
    issueType: 'Software',
    type: 'Incident',
    subIssueType: 'Other',
  },
  {
    ticketNumber: '524918',
    title: 'Solanki- set up',
    account: 'UHY Calvert Smith',
    queue: 'Service Desk',
    createdBy: 'Kerrie Moore',
    assignee: 'Simphiwe Morare',
    priority: 'P4; Low',
    issueType: 'Access',
    type: 'Incident',
    subIssueType: 'Other',
  },
  {
    ticketNumber: '525148',
    title: 'Account - Grace Watson',
    account: 'UHY Calvert Smith',
    queue: 'Service Desk',
    createdBy: 'Simphiwe Morare',
    assignee: 'Simphiwe Morare',
    priority: 'P4; Low',
    issueType: 'Access',
    type: 'Service Request',
    subIssueType: 'Account Unlock',
  },
  {
    ticketNumber: '525386',
    title: 'Unlock Account',
    account: 'UHY Calvert Smith',
    queue: 'Service Desk',
    createdBy: 'Simphiwe Morare',
    assignee: 'Simphiwe Morare',
    priority: 'P4; Low',
    issueType: 'Access',
    type: 'Service Request',
    subIssueType: 'Account Unlock',
  },
  {
    ticketNumber: '525494',
    title: 'FW: Ed Heaton Ltd',
    account: 'UHY Calvert Smith',
    queue: 'Service Desk',
    createdBy: 'Sophie Dicken',
    assignee: 'Simphiwe Morare',
    priority: 'P4; Low',
    issueType: 'Email',
    type: 'Incident',
    subIssueType: 'Mimecast',
  },
  {
    ticketNumber: '527088',
    title: 'New Starters June 23',
    account: 'UHY Calvert Smith',
    queue: 'Service Desk',
    createdBy: 'Hayden Priest',
    assignee: 'Simphiwe Morare',
    priority: 'P4; Low',
    issueType: 'Access',
    type: 'Service Request',
    subIssueType: 'New User - AD and Mail',
  },
  {
    ticketNumber: '528361',
    title: 'UHY CALVERT SMITH (UHY): [Warning] Environment Moni',
    account: 'UHY Calvert Smith',
    queue: 'Alerts',
    createdBy: 'Api',
    assignee: 'Simphiwe Morare',
    priority: 'P4; Low',
    issueType: 'Alerts - PRTG',
    type: 'Incident',
    subIssueType: '—',
  },
  {
    ticketNumber: '528572',
    title: 'Excel issues',
    account: 'UHY Calvert Smith',
    queue: 'Service Desk',
    createdBy: 'Liz Atiba-Davies',
    assignee: 'Simphiwe Morare',
    priority: 'P4; Low',
    issueType: 'Software',
    type: 'Incident',
    subIssueType: 'Microsoft Excel',
  },
  {
    ticketNumber: '528718',
    title: 'Outlook',
    account: 'UHY Calvert Smith',
    queue: 'Service Desk',
    createdBy: 'Simphiwe Morare',
    assignee: 'Simphiwe Morare',
    priority: 'P4; Low',
    issueType: 'Software',
    type: 'Service Request',
    subIssueType: 'Outlook',
  },
  {
    ticketNumber: '529243',
    title: 'Forwarding of Mailbox',
    account: 'UHY Calvert Smith',
    queue: 'Service Desk',
    createdBy: 'Rachel Holt',
    assignee: 'Simphiwe Morare',
    priority: 'P4; Low',
    issueType: 'Email',
    type: 'Service Request',
    subIssueType: 'Exchange Online',
  },
  {
    ticketNumber: '529383',
    title: 'Payroll Manager Updating on RDS.',
    account: 'UHY Calvert Smith',
    queue: 'Service Desk',
    createdBy: 'Simphiwe Morare',
    assignee: 'Simphiwe Morare',
    priority: 'P4; Low',
    issueType: 'Software',
    type: 'Service Request',
    subIssueType: 'MoneySoft Payroll Manager',
  },
  {
    ticketNumber: '529790',
    title: 'Performance',
    account: 'UHY Calvert Smith',
    queue: 'Service Desk',
    createdBy: 'Simphiwe Morare',
    assignee: 'Simphiwe Morare',
    priority: 'P4; Low',
    issueType: 'Personal Computer',
    type: 'Incident',
    subIssueType: 'Performance',
  },
  {
    ticketNumber: '530124',
    title: '2-FA failure.',
    account: 'UHY Calvert Smith',
    queue: 'Service Desk',
    createdBy: 'Sandy Stericker',
    assignee: 'Simphiwe Morare',
    priority: 'P4; Low',
    issueType: 'Email',
    type: 'Incident',
    subIssueType: 'Mimecast',
  },
  {
    ticketNumber: '530372',
    title: 'User Data',
    account: 'UHY Calvert Smith',
    queue: 'Service Desk',
    createdBy: 'Simphiwe Morare',
    assignee: 'Simphiwe Morare',
    priority: 'P4; Low',
    issueType: 'Personal Computer',
    type: 'Service Request',
    subIssueType: 'Disk Space',
  },
  {
    ticketNumber: '530407',
    title: 'New Starter - User Required',
    account: 'UHY Calvert Smith',
    queue: 'Service Desk',
    createdBy: 'Rachel Holt',
    assignee: 'Simphiwe Morare',
    priority: 'P4; Low',
    issueType: 'Access',
    type: 'Service Request',
    subIssueType: 'New User - AD and Mail',
  },
  {
    ticketNumber: '530541',
    title: 'Starter - Meera - July 2023',
    account: 'UHY Calvert Smith',
    queue: 'Service Desk',
    createdBy: 'Hayden Priest',
    assignee: 'Simphiwe Morare',
    priority: 'P4; Low',
    issueType: 'Access',
    type: 'Service Request',
    subIssueType: 'New User - AD and Mail',
  },
  {
    ticketNumber: '530606',
    title: 'RE: Sage',
    account: 'UHY Calvert Smith',
    queue: 'Service Desk',
    createdBy: 'Rebecca Baxter',
    assignee: 'Simphiwe Morare',
    priority: 'P4; Low',
    issueType: 'Software',
    type: 'Service Request',
    subIssueType: 'Sage',
  },
  {
    ticketNumber: '530609',
    title: 'Account Locked',
    account: 'UHY Calvert Smith',
    queue: 'Service Desk',
    createdBy: 'Simphiwe Morare',
    assignee: 'Simphiwe Morare',
    priority: 'P4; Low',
    issueType: 'Access',
    type: 'Service Request',
    subIssueType: 'Account Unlock',
  },
  {
    ticketNumber: '530717',
    title: 'VPN Authentication',
    account: 'UHY Calvert Smith',
    queue: 'Service Desk',
    createdBy: 'Simphiwe Morare',
    assignee: 'Simphiwe Morare',
    priority: 'P4; Low',
    issueType: 'Access',
    type: 'Incident',
    subIssueType: 'MFA',
  },
  {
    ticketNumber: '530779',
    title: 'UHY CALVERT SMITH (UHY): [Warning] uhyykv09.cs.local',
    account: 'UHY Calvert Smith',
    queue: 'Alerts',
    createdBy: 'Api',
    assignee: 'Simphiwe Morare',
    priority: 'P4; Low',
    issueType: 'Alerts - PRTG',
    type: 'Incident',
    subIssueType: '—',
  },
  {
    ticketNumber: '530972',
    title: 'New Starter - Maheen',
    account: 'UHY Calvert Smith',
    queue: 'Service Desk',
    createdBy: 'Hayden Priest',
    assignee: 'Simphiwe Morare',
    priority: 'P4; Low',
    issueType: 'Access',
    type: 'Service Request',
    subIssueType: 'New User - AD and Mail',
  },
  {
    ticketNumber: '531136',
    title: 'Outlook application not working',
    account: 'UHY Calvert Smith',
    queue: 'Service Desk',
    createdBy: 'Daniel Corneelsen',
    assignee: 'Simphiwe Morare',
    priority: 'P4; Low',
    issueType: 'Email',
    type: 'Service Request',
    subIssueType: 'Outlook',
  },
];

const TICKET_COLLECTION: TicketItem[] = [
  {
    id: 'catch-22',
    title: 'Catch 22',
    category: 'catch-22',
    clientName: 'Catch 22',
    fileName: 'CATCH_22_SERVICE_DESK_EXPORT.XLSX',
    imageSrc: '/tickets/catch22-logo.svg',
    description: 'Catch 22 is a leading recruitment agency in the UK, specializing in Facilities Management. They have been operating for over 40 years and are known for delivering real recruitment solutions. They offer a range of services from business support to operational support, executive recruitment, technical recruitment, and public sector recruitment. They have a team with 150 years of combined experience, making them a trusted choice for many top FM companies in the UK. Catch 22 is proud to be the very first recruitment specialist in the FM recruitment space.',
    highlights: [
      'New hire tenant onboarding and automated mailbox provisioning',
      'Offboarding security protocols: session revocation & mailbox conversion',
      'MFA troubleshooting & Microsoft Authenticator re-registration',
      'License allocation audits & tier optimization for client tenants',
    ],
    tools: ['Microsoft 365 Admin', 'Active Directory', 'Exchange Online', 'Mimecast', 'CloudCall', 'PRTG Monitor'],
    excelRows: CATCH_22_ROWS,
  },
  {
    id: 'flannery',
    title: 'Flannery Civil Engineering',
    category: 'flannery',
    clientName: 'Flannery Civil Engineering Ltd.',
    fileName: 'FLANNERY_CIVIL_ENGINEERING_EXPORT.XLSX',
    imageSrc: '/tickets/flannery-logo.svg',
    description: 'Flannery Civil Engineering Ltd. is a specialist civil engineering contractor based in Castleford, United Kingdom. They provide services related to construction plant and equipment hire. Their address is Unit 2B, Willowbridge Way, Whitwood, Castleford WF10 5NP1. Operating hours are Monday to Friday, 08:00 - 18:00.',
    highlights: [
      'PRTG sensor alert monitoring and core server node triage',
      'User access control, password resets, and file path recovery',
      'Exchange Online email forwarding configuration & Mimecast message release',
      'Network printer driver installation and scanner mapping across depot workstations',
    ],
    tools: ['PRTG Monitor', 'Active Directory', 'Microsoft 365', 'Mimecast', 'Print Management', 'Service Desk'],
    excelRows: FLANNERY_ROWS,
  },
  {
    id: 'fusion-2k',
    title: 'Fusion 2K',
    category: 'fusion-2k',
    clientName: 'Fusion 2K Ltd.',
    fileName: 'FUSION_2K_SERVICE_DESK_EXPORT.XLSX',
    imageSrc: '/tickets/fusion2k-logo.svg',
    description: 'Fusion 2K Ltd, based in the UK, is a full-service agency that specializes in event management. They establish close relationships with their clients to help strategize the most cohesive, intelligent marketing campaigns.',
    highlights: [
      'Microsoft 365 vulnerability exploit triage & security mitigations',
      'Daily Spanning Backup checks for Office 365 cloud integrity',
      'Microsoft Teams & Excel crash diagnostics and audio peripheral fixes',
      'User onboarding, shared inbox provisioning & FileZilla deployment',
    ],
    tools: ['Microsoft 365', 'Spanning Backup', 'Microsoft Teams', 'Security Mitigation', 'FileZilla', 'Outlook'],
    excelRows: FUSION_ROWS,
  },
  {
    id: 'jeremy-wood',
    title: 'Jeremy Wood Designed Interiors',
    category: 'jeremy-wood',
    clientName: 'Jeremy Wood Designed Interiors',
    fileName: 'JEREMY_WOOD_KITCHENS_SERVICE_DESK_EXPORT.XLSX',
    imageSrc: '/tickets/jeremywood-logo.svg',
    description: 'Jeremy Wood Designed Interiors, based in the UK, is a company that specializes in creating beautiful handmade interiors. They have been in business since 1991 and have over 30 years of experience. Their services include designing and crafting kitchens, bedrooms, utility/bootrooms, dressing rooms, media rooms, and home offices. They offer both traditional and contemporary designs, and their work exudes quality. They are known for their exquisite designs and handcrafted furniture. The company is located at 14-16 North Street, Wetherby LS22 6NN. They can be contacted at the phone number 01937 586544. Their opening hours are from Monday to Friday, 09:00 - 17:00, and Saturday 09:30 - 16:30.',
    highlights: [
      'Mimecast email security held-message triage & content policy releases',
      'Exchange Online delegate mailbox permissions & signature synchronization',
      'Windows Server disk space analysis, storage query remediation & PAT testing',
      'Application support for Adobe Standard, PDF viewers, Outlook & Windows Explorer',
    ],
    tools: ['Microsoft 365', 'Exchange Online', 'Mimecast', 'Active Directory', 'Windows Server', 'Service Desk'],
    excelRows: JEREMY_WOOD_ROWS,
  },
  {
    id: 'northern-fells',
    title: 'The Northern Fells Group',
    category: 'northern-fells',
    clientName: 'The Northern Fells Group (NFG)',
    fileName: 'NORTHERN_FELLS_GROUP_EXPORT.XLSX',
    imageSrc: '/tickets/nfg-logo.svg',
    description: 'The Northern Fells Group is a community charity based in North Cumbria, UK. They serve 3,700 residents in an upland area of over 200 square miles across seven parishes: Ireby & Uldale, Boltons, Westward & Rosley, Sebergham & Welton, Caldbeck, Castle Sowerby, and Mungrisdale. The group aims to combat rural social isolation and exclusion, alleviate deprivation, improve access to services, and enable people to remain independent, living in their own homes and in the area. To achieve these goals, they have developed a range of services and activities, including a Community Minibus, a Village Agent service, Men in Sheds group, a Lend a Hand scheme, Benefits Awareness project, and Holiday Play schemes. Their office is located at Millhouse Village Hall, Millhouse, Wigton CA7 8HR. They can be contacted at the phone number 016974 78094.',
    highlights: [
      'Microsoft Outlook folder recovery & Exchange Online contact sharing',
      'Personal OneDrive client synchronization & File Explorer integration',
      'Remote worker laptop hardware diagnostics & battery power failure triage',
      'Home printer driver deployment & Google Docs access permissions provisioning',
    ],
    tools: ['Microsoft 365', 'Exchange Online', 'OneDrive', 'Outlook', 'Printer Driver Setup', 'Service Desk'],
    excelRows: NORTHERN_FELLS_ROWS,
  },
  {
    id: 'palm-yorkshire',
    title: 'Palm Yorkshire',
    category: 'palm-yorkshire',
    clientName: 'Palm Yorkshire',
    fileName: 'PALM_YORKSHIRE_SERVICE_DESK_EXPORT.XLSX',
    imageSrc: '/tickets/palm-logo.svg',
    description: 'Palm Yorkshire, based in the UK, is a specialist in central heating services. They have been operating for over 30 years and are known for their quality work. Their services include boiler replacements, electrical re-wires, and more. They have a team of experts with over 30+ years of experience in the industry. Palm Yorkshire is both Gas Safe registered and NICEIC Approved Contractors, ensuring quality work at all times.',
    highlights: [
      'New starter user provisioning across Active Directory & Exchange mailboxes',
      'Shared mailbox creation & delegation (Diocese & WDH Voids workflows)',
      'Secure corporate VPN tunnel troubleshooting & mapped drive configuration',
      'Workstation performance diagnostics, Outlook triage & mailbox access audits',
    ],
    tools: ['Microsoft 365', 'Exchange Online', 'Active Directory', 'Corporate VPN', 'Outlook', 'Service Desk'],
    excelRows: PALM_YORKSHIRE_ROWS,
  },
  {
    id: 'solution-house',
    title: 'The Solution House',
    category: 'solution-house',
    clientName: 'The Solution House (TSH)',
    fileName: 'THE_SOLUTION_HOUSE_SERVICE_DESK_EXPORT.XLSX',
    imageSrc: '/tickets/thesolutionhouse-logo.svg',
    description: 'The Solution House, based in the UK, is a company that brings print to life. They have been operating for over 14 years and are known for creating innovative print production and installation solutions. The company is located at Marston Business Park, York YO26 7QF. They can be contacted at the phone number 01423 359206.',
    highlights: [
      'Industrial cutting machine PC server connectivity & folder permissions',
      'Cisco Meraki cloud licensing alerts & PRTG network monitoring incident triage',
      'Microsoft 365 Business Standard/Premium & Extra Storage licensing management',
      'New starter Dell laptop imaging, AD account provisioning & Adobe Creative Cloud installs',
    ],
    tools: ['Microsoft 365', 'Active Directory', 'Cisco Meraki', 'PRTG Network Monitor', 'Dell Client', 'Service Desk'],
    excelRows: SOLUTION_HOUSE_ROWS,
  },
  {
    id: 'uhy-calvert-smith',
    title: 'UHY Calvert Smith',
    category: 'uhy-calvert-smith',
    clientName: 'UHY Calvert Smith Chartered Accountants',
    fileName: 'UHY_CALVERT_SMITH_SERVICE_DESK_EXPORT.XLSX',
    imageSrc: '/tickets/uhy-logo.svg',
    description: 'UHY Calvert Smith is a York-based accounting firm in the UK, part of the UHY Hacker Young Group, offering a wide range of services including bookkeeping, payroll, tax, audit, and more. They merged with Hare & Co in 2019, and now have a team of 34, including six partners. Their office is open from Monday to Friday, 09:00 - 17:00.',
    highlights: [
      'PRTG network environment monitor & probe device incident resolution',
      'New starter user onboarding across Active Directory, Exchange & RDS',
      'Financial software support for MoneySoft Payroll Manager, Sage & Microsoft Excel',
      'Mimecast email security triage, 2-FA authentication & VPN MFA setup',
    ],
    tools: ['Microsoft 365', 'Active Directory', 'PRTG Network Monitor', 'MoneySoft Payroll', 'Sage', 'Mimecast', 'Remote Desktop Services'],
    excelRows: UHY_ROWS,
  },
];

export const TicketsSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeModalTicket, setActiveModalTicket] = useState<TicketItem | null>(null);
  const [modalTab, setModalTab] = useState<'image' | 'table'>('table');
  const [tableSearchQuery, setTableSearchQuery] = useState('');

  const filteredTickets = selectedCategory === 'all'
    ? TICKET_COLLECTION
    : TICKET_COLLECTION.filter((t) => t.category === selectedCategory);

  const filterCategories = [
    { id: 'all', label: 'All Tickets' },
    { id: 'catch-22', label: 'Catch 22' },
    { id: 'flannery', label: 'Flannery' },
    { id: 'fusion-2k', label: 'Fusion 2K' },
    { id: 'jeremy-wood', label: 'Jeremy Wood' },
    { id: 'northern-fells', label: 'Northern Fells' },
    { id: 'palm-yorkshire', label: 'Palm Yorkshire' },
    { id: 'solution-house', label: 'The Solution House' },
    { id: 'uhy-calvert-smith', label: 'UHY Calvert Smith' },
  ];

  const handleOpenModal = (ticket: TicketItem, defaultTab: 'image' | 'table' = 'table') => {
    setActiveModalTicket(ticket);
    setModalTab(defaultTab);
    setTableSearchQuery('');
  };

  const handleCloseModal = () => {
    setActiveModalTicket(null);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleCloseModal();
      }
    };

    if (activeModalTicket) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeModalTicket]);

  return (
    <section id="tickets" className="academic-grid-bg py-16 px-4 sm:px-6 lg:px-8 border-b border-slate-800/80">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Section Header */}
        <div className="space-y-3">
          <SectionHeader
            badge="Operational Evidence"
            title="Tickets"
          />
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed -mt-4 max-w-3xl">
            During my tenure at <span className="text-blue-400 font-semibold">Italik (MSP)</span>, I resolved hundreds of enterprise support incidents across multiple client tenants. Below are categorized ticket exports saved as Excel spreadsheets showcasing real SLA metrics, incident diagnosis, technical resolutions, and workflow tracking.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-1 pb-2">
          {filterCategories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                type="button"
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-900/40 border border-blue-400'
                    : 'bg-slate-900/80 text-slate-400 border border-slate-800 hover:text-slate-200 hover:border-slate-700'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Grid of Ticket Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredTickets.map((ticket, idx) => (
            <motion.div
              key={ticket.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.4, delay: (idx % 4) * 0.08 }}
              className="h-full"
            >
              <Card
                className="flex flex-col justify-between overflow-hidden group border-slate-800/90 hover:border-blue-500/60 transition-all p-0 h-full"
              >
                <div>
                  {/* Excel Spreadsheet Preview Thumbnail with Overlay */}
                  <div
                    onClick={() => handleOpenModal(ticket, ticket.excelRows ? 'table' : 'image')}
                    className="relative h-48 sm:h-52 w-full bg-slate-950 overflow-hidden cursor-pointer group/thumb border-b border-slate-800"
                  >
                    <Image
                      src={ticket.imageSrc}
                      alt={ticket.title}
                      fill
                      className={`${
                        ticket.id === 'catch-22' || ticket.id === 'flannery' || ticket.id === 'fusion-2k' || ticket.id === 'jeremy-wood' || ticket.id === 'northern-fells' || ticket.id === 'palm-yorkshire' || ticket.id === 'solution-house' || ticket.id === 'uhy-calvert-smith' ? 'object-contain p-3 sm:p-4' : 'object-cover object-top'
                      } transition-transform duration-500 group-hover/thumb:scale-105 opacity-90 group-hover/thumb:opacity-100`}
                      unoptimized
                    />
                    
                    {/* Subtle Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

                    {/* Click to Expand Action Banner */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/thumb:opacity-100 transition-opacity bg-slate-950/60 backdrop-blur-xs">
                      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-600 text-white text-xs font-bold shadow-xl transform translate-y-2 group-hover/thumb:translate-y-0 transition-transform">
                        <Maximize2 className="w-4 h-4" />
                        <span>Click to View Spreadsheet</span>
                      </div>
                    </div>

                    {/* File Name Label at Bottom of Thumbnail */}
                    <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-[11px] font-mono text-slate-300 pointer-events-none">
                      <span className="truncate bg-slate-900/90 px-2 py-0.5 rounded border border-slate-700">
                        📄 {ticket.fileName}
                      </span>
                    </div>
                  </div>

                  {/* Card Body Content */}
                  <div className="p-5 space-y-3">
                    <div>
                      <h3 className="text-base font-bold text-slate-100 group-hover:text-blue-300 transition-colors flex items-center gap-2">
                        {ticket.title}
                      </h3>
                      <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                        {ticket.description}
                      </p>
                    </div>

                    {/* Highlights Bullet points */}
                    <div className="space-y-1.5 pt-1 text-xs text-slate-300">
                      {ticket.highlights.map((h, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5 shrink-0" />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Footer: Tools and Interactive Action Buttons */}
                <div className="p-5 pt-0 space-y-3">
                  <div className="flex flex-wrap gap-1.5 pt-3 border-t border-slate-800/80">
                    {ticket.tools.map((tool) => (
                      <Badge key={tool} variant="slate" className="text-[10px]">
                        {tool}
                      </Badge>
                    ))}
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-2">
                    <button
                      onClick={() => handleOpenModal(ticket, 'image')}
                      type="button"
                      className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-blue-600/90 hover:bg-blue-600 text-white text-xs font-semibold shadow-md transition-colors"
                    >
                      <Maximize2 className="w-3.5 h-3.5" />
                      <span>View Image</span>
                    </button>
                    <button
                      onClick={() => handleOpenModal(ticket, 'table')}
                      type="button"
                      className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors"
                    >
                      <Table className="w-3.5 h-3.5 text-blue-400" />
                      <span>Data Grid</span>
                    </button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Interactive Lightbox / Spreadsheet Viewer Modal */}
      <AnimatePresence>
        {activeModalTicket && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-md"
            onClick={handleCloseModal}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl w-full max-w-5xl max-h-[92vh] flex flex-col overflow-hidden text-slate-100"
              onClick={(e) => e.stopPropagation()}
            >
            {/* Modal Header */}
            <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-emerald-950 border border-emerald-700/70 text-emerald-400">
                  <FileSpreadsheet className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-sm sm:text-base font-bold text-slate-100">
                      {activeModalTicket.fileName}
                    </h3>
                  </div>
                  <p className="text-xs text-slate-400 font-mono mt-0.5">
                    Italik MSP Service Desk Ticket Export
                  </p>
                </div>
              </div>

              {/* Close Button */}
              <button
                onClick={handleCloseModal}
                type="button"
                className="p-2 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800 border border-slate-700 transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Tab Controls */}
            <div className="px-4 sm:px-6 py-2.5 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between gap-3 flex-wrap">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setModalTab('table')}
                  type="button"
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    modalTab === 'table'
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                  }`}
                >
                  <Table className="w-3.5 h-3.5" />
                  <span>Interactive Data Table</span>
                </button>
                <button
                  onClick={() => setModalTab('image')}
                  type="button"
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    modalTab === 'image'
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                  }`}
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span>Spreadsheet Image View</span>
                </button>
              </div>

              <div className="flex items-center gap-2 text-xs text-slate-400">
                <a
                  href={activeModalTicket.imageSrc}
                  target="_blank"
                  rel="noreferrer"
                  className="hidden sm:inline-flex items-center gap-1 text-blue-400 hover:underline"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Open Full Size</span>
                </a>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-4 sm:p-6 overflow-y-auto grow space-y-4 bg-[#090D14]">
              {modalTab === 'image' ? (
                <div className="space-y-3">
                  <div className="relative w-full rounded-xl overflow-hidden border border-slate-800 bg-slate-950 shadow-inner flex items-center justify-center p-2">
                    <Image
                      src={activeModalTicket.imageSrc}
                      alt={activeModalTicket.title}
                      width={1200}
                      height={675}
                      className="w-full h-auto object-contain max-h-[60vh] mx-auto rounded-lg"
                      unoptimized
                    />
                  </div>
                  <div className="flex items-center justify-between text-xs text-slate-400 bg-slate-900/60 p-3 rounded-lg border border-slate-800">
                    <span>💡 Tip: Click &quot;Open Full Size&quot; or switch to &quot;Interactive Data Table&quot; to inspect ticket row details.</span>
                    <a
                      href={activeModalTicket.imageSrc}
                      download={`${activeModalTicket.fileName}.jpg`}
                      className="inline-flex items-center gap-1.5 text-blue-400 hover:text-blue-300 font-semibold"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download Preview</span>
                    </a>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  {/* Table Search */}
                  <div className="flex items-center gap-2 bg-slate-900 px-3 py-2 rounded-lg border border-slate-800">
                    <Search className="w-4 h-4 text-slate-400 shrink-0" />
                    <input
                      type="text"
                      placeholder="Search ticket number, title, assignee, issue type or queue..."
                      value={tableSearchQuery}
                      onChange={(e) => setTableSearchQuery(e.target.value)}
                      className="bg-transparent text-xs text-slate-100 placeholder:text-slate-500 w-full focus:outline-hidden"
                    />
                    {tableSearchQuery && (
                      <button
                        onClick={() => setTableSearchQuery('')}
                        type="button"
                        className="text-xs text-slate-400 hover:text-slate-200"
                      >
                        Clear
                      </button>
                    )}
                  </div>

                  {/* Excel Specific Table for Catch 22, Flannery, Fusion 2K and future datasets */}
                  {activeModalTicket.excelRows ? (() => {
                    const hasQueue = activeModalTicket.excelRows.some((r) => !!r.queue);
                    const hasCreatedBy = activeModalTicket.excelRows.some((r) => !!r.createdBy);
                    const hasStatus = activeModalTicket.excelRows.some((r) => !!r.status);

                    return (
                      <div className="rounded-xl border border-slate-800 overflow-x-auto bg-slate-950">
                        <table className="w-full text-left text-xs text-slate-300 divide-y divide-slate-800">
                          <thead className="bg-[#1E7145]/90 text-white font-mono text-[11px] tracking-wider uppercase">
                            <tr>
                              <th className="px-3.5 py-2.5 whitespace-nowrap">Ticket Number</th>
                              <th className="px-3.5 py-2.5 whitespace-nowrap">Title</th>
                              <th className="px-3.5 py-2.5 whitespace-nowrap">Account</th>
                              {hasQueue && <th className="px-3.5 py-2.5 whitespace-nowrap">Queue</th>}
                              {hasCreatedBy && <th className="px-3.5 py-2.5 whitespace-nowrap">Created By</th>}
                              <th className="px-3.5 py-2.5 whitespace-nowrap">Assignee</th>
                              <th className="px-3.5 py-2.5 whitespace-nowrap">Priority</th>
                              {hasStatus && <th className="px-3.5 py-2.5 whitespace-nowrap">Status</th>}
                              <th className="px-3.5 py-2.5 whitespace-nowrap">Issue Type</th>
                              <th className="px-3.5 py-2.5 whitespace-nowrap">Type</th>
                              <th className="px-3.5 py-2.5 whitespace-nowrap">Sub_Issue Type</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-800/60 font-sans">
                            {activeModalTicket.excelRows
                              .filter((row) =>
                                tableSearchQuery === ''
                                  ? true
                                  : row.ticketNumber.toLowerCase().includes(tableSearchQuery.toLowerCase()) ||
                                    row.title.toLowerCase().includes(tableSearchQuery.toLowerCase()) ||
                                    row.account.toLowerCase().includes(tableSearchQuery.toLowerCase()) ||
                                    (row.queue && row.queue.toLowerCase().includes(tableSearchQuery.toLowerCase())) ||
                                    (row.createdBy && row.createdBy.toLowerCase().includes(tableSearchQuery.toLowerCase())) ||
                                    (row.status && row.status.toLowerCase().includes(tableSearchQuery.toLowerCase())) ||
                                    row.assignee.toLowerCase().includes(tableSearchQuery.toLowerCase()) ||
                                    row.issueType.toLowerCase().includes(tableSearchQuery.toLowerCase()) ||
                                    row.type.toLowerCase().includes(tableSearchQuery.toLowerCase()) ||
                                    (row.subIssueType && row.subIssueType.toLowerCase().includes(tableSearchQuery.toLowerCase()))
                              )
                              .map((row, rIdx) => (
                                <tr key={rIdx} className="hover:bg-slate-900/60 transition-colors">
                                  <td className="px-3.5 py-2.5 font-mono font-bold text-blue-400 whitespace-nowrap">
                                    {row.ticketNumber}
                                  </td>
                                  <td className="px-3.5 py-2.5 font-medium text-slate-100 whitespace-nowrap">
                                    {row.title}
                                  </td>
                                  <td className="px-3.5 py-2.5 text-slate-300 whitespace-nowrap">
                                    <span className="inline-flex items-center gap-1">
                                      <Building2 className="w-3 h-3 text-slate-400" />
                                      {row.account}
                                    </span>
                                  </td>
                                  {hasQueue && (
                                    <td className="px-3.5 py-2.5 text-slate-400 whitespace-nowrap">
                                      {row.queue || '—'}
                                    </td>
                                  )}
                                  {hasCreatedBy && (
                                    <td className="px-3.5 py-2.5 text-slate-300 whitespace-nowrap">
                                      {row.createdBy || '—'}
                                    </td>
                                  )}
                                  <td className="px-3.5 py-2.5 font-semibold text-emerald-400 whitespace-nowrap">
                                    {row.assignee}
                                  </td>
                                  <td className="px-3.5 py-2.5 whitespace-nowrap">
                                    <span
                                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                        row.priority.includes('P5')
                                          ? 'bg-blue-950 text-blue-300 border border-blue-800'
                                          : 'bg-slate-800 text-slate-300 border border-slate-700'
                                      }`}
                                    >
                                      {row.priority}
                                    </span>
                                  </td>
                                  {hasStatus && (
                                    <td className="px-3.5 py-2.5 whitespace-nowrap">
                                      <span
                                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                          row.status === 'Completed'
                                            ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-800/80'
                                            : 'bg-amber-950/80 text-amber-300 border border-amber-800/80'
                                        }`}
                                      >
                                        {row.status || '—'}
                                      </span>
                                    </td>
                                  )}
                                  <td className="px-3.5 py-2.5 whitespace-nowrap text-slate-300">
                                    {row.issueType}
                                  </td>
                                  <td className="px-3.5 py-2.5 whitespace-nowrap">
                                    <span
                                      className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                                        row.type === 'Incident'
                                          ? 'bg-amber-950/80 text-amber-300 border border-amber-800/80'
                                          : row.type === 'Problem'
                                          ? 'bg-rose-950/80 text-rose-300 border border-rose-800/80'
                                          : 'bg-indigo-950/80 text-indigo-300 border border-indigo-800/80'
                                      }`}
                                    >
                                      {row.type}
                                    </span>
                                  </td>
                                  <td className="px-3.5 py-2.5 whitespace-nowrap text-slate-300 font-mono text-[11px]">
                                    {row.subIssueType || '—'}
                                  </td>
                                </tr>
                              ))}
                          </tbody>
                        </table>
                      </div>
                    );
                  })() : activeModalTicket.sampleRows ? (
                    <div className="rounded-xl border border-slate-800 overflow-x-auto bg-slate-950">
                      <table className="w-full text-left text-xs text-slate-300 divide-y divide-slate-800">
                        <thead className="bg-slate-900/90 text-slate-200 uppercase font-mono text-[11px] tracking-wider">
                          <tr>
                            <th className="px-3.5 py-2.5">Ticket #</th>
                            <th className="px-3.5 py-2.5">Client</th>
                            <th className="px-3.5 py-2.5">Priority</th>
                            <th className="px-3.5 py-2.5">Subject & Description</th>
                            <th className="px-3.5 py-2.5">Resolution Steps</th>
                            <th className="px-3.5 py-2.5">SLA</th>
                            <th className="px-3.5 py-2.5">Time</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800/60 font-sans">
                          {activeModalTicket.sampleRows
                            .filter((row) =>
                              tableSearchQuery === ''
                                ? true
                                : row.ticketId.toLowerCase().includes(tableSearchQuery.toLowerCase()) ||
                                  row.client.toLowerCase().includes(tableSearchQuery.toLowerCase()) ||
                                  row.subject.toLowerCase().includes(tableSearchQuery.toLowerCase()) ||
                                  row.resolution.toLowerCase().includes(tableSearchQuery.toLowerCase())
                            )
                            .map((row, rIdx) => (
                              <tr key={rIdx} className="hover:bg-slate-900/40 transition-colors">
                                <td className="px-3.5 py-3 font-mono font-bold text-blue-400 whitespace-nowrap">
                                  {row.ticketId}
                                </td>
                                <td className="px-3.5 py-3 font-semibold text-slate-200 whitespace-nowrap">
                                  {row.client}
                                </td>
                                <td className="px-3.5 py-3 whitespace-nowrap">
                                  <span
                                    className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                      row.priority === 'Critical'
                                        ? 'bg-rose-950 text-rose-300 border border-rose-800'
                                        : row.priority === 'High'
                                        ? 'bg-amber-950 text-amber-300 border border-amber-800'
                                        : row.priority === 'Medium'
                                        ? 'bg-blue-950 text-blue-300 border border-blue-800'
                                        : 'bg-slate-800 text-slate-300 border border-slate-700'
                                    }`}
                                  >
                                    {row.priority}
                                  </span>
                                </td>
                                <td className="px-3.5 py-3 font-medium text-slate-100 max-w-xs">
                                  {row.subject}
                                </td>
                                <td className="px-3.5 py-3 text-slate-300 max-w-sm leading-relaxed">
                                  {row.resolution}
                                </td>
                                <td className="px-3.5 py-3 whitespace-nowrap">
                                  <span className="inline-flex items-center gap-1 text-emerald-400 font-semibold text-[11px]">
                                    <CheckCircle2 className="w-3.5 h-3.5" />
                                    {row.sla}
                                  </span>
                                </td>
                                <td className="px-3.5 py-3 font-mono text-slate-400 whitespace-nowrap">
                                  <span className="flex items-center gap-1">
                                    <Clock className="w-3 h-3 text-slate-500" />
                                    {row.duration}
                                  </span>
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  ) : null}
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-slate-800 bg-slate-950/90 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5 text-slate-300">
                  <Layers className="w-4 h-4 text-blue-400" />
                  Service Desk Ticket Export Dataset
                </span>
              </div>
              <button
                onClick={handleCloseModal}
                type="button"
                className="w-full sm:w-auto px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold transition-colors"
              >
                Close Viewer
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  </section>
);
};

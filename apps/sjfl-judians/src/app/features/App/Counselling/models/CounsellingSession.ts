export interface CounsellingSessions {
  data: CounsellingSession[];
  lastRow: number;
}

export interface CounsellingSession {
  counsellingId: string;
  counsellingDate: string;
  note: string;
  counsellingStatus: string;
}

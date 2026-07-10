export type ScheduleStatus = "selesai" | "berlangsung" | "akan-datang";

export interface ScheduleItem {
  id: string;
  startTime: string;
  endTime: string;
  subject: string;
  teacherName: string;
  room: string;
  status: ScheduleStatus;
}

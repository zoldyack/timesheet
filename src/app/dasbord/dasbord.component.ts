import { Component } from '@angular/core';
interface TimeEntry {
  clockIn: Date;
  clockOut: Date;
  workDuration: string;
}
@Component({
  selector: 'app-dasbord',
  templateUrl: './dasbord.component.html',
  styleUrls: ['./dasbord.component.css']
})
export class DasbordComponent {
  clockStarted: boolean = false;
  startTime: number | null = null;
  endTime: number | null = null;
  formattedWorkDuration: string = '0 seconds';
  timer: any = null;
  timeEntries: TimeEntry[] = [];
  selected!: Date | null;
  
  clockIn() {
    this.clockStarted = true;
    this.startTime = Date.now();
    this.endTime = null;
    this.formattedWorkDuration = '0 seconds';
    this.startTimer();
  }

  clockOut() {
    if (this.startTime) {
      this.endTime = Date.now();
      this.clockStarted = false;
      this.stopTimer();
      const workDuration = this.calculateWorkDuration(this.startTime, this.endTime);
      const newEntry: TimeEntry = {
        clockIn: new Date(this.startTime),
        clockOut: new Date(this.endTime),
        workDuration: workDuration
      };
      this.timeEntries.push(newEntry);
      this.startTime = null;
    }
  }

  startTimer() {
    this.timer = setInterval(() => {
      if (this.startTime) {
        const now = Date.now();
        const diff = (now - this.startTime) / 1000; // in seconds
        this.formattedWorkDuration = this.formatDuration(diff);
      }
    }, 1000);
  }

  stopTimer() {
    clearInterval(this.timer);
    this.timer = null;
  }

  calculateWorkDuration(start: number, end: number): string {
    const diff = (end - start) / 1000; // in seconds
    return this.formatDuration(diff);
  }

  formatDuration(seconds: number): string {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${hours}:${minutes}:${remainingSeconds} Hrs`;
  }
  getFormattedNumberTooltip(date: Date | null): string {
    if (date) {
      // Add your logic to get the formatted number based on the date
      const formattedNumber = this.formatNumberBasedOnDate(date);
      return `Number: ${formattedNumber}`;
    } else {
      return '';
    }
  }
  
  formatNumberBasedOnDate(date: Date): string {
    return date.getTime().toString();
  }
  calculateWeeklyHours(): number {
    const now = new Date();
    const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000); // 7 days ago
    const entriesInWeek = this.timeEntries.filter(
      entry => entry.clockIn >= oneWeekAgo && entry.clockOut <= now
    );
    const totalSeconds = entriesInWeek.reduce(
      (acc, entry) => acc + this.calculateSeconds(entry.clockIn, entry.clockOut),
      0
    );
    return this.convertSecondsToHours(totalSeconds);
  }

  // Calculate total hours worked in a month
  calculateMonthlyHours(): number {
    const now = new Date();
    const oneMonthAgo = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
    const entriesInMonth = this.timeEntries.filter(
      entry => entry.clockIn >= oneMonthAgo && entry.clockOut <= now
    );
    const totalSeconds = entriesInMonth.reduce(
      (acc, entry) => acc + this.calculateSeconds(entry.clockIn, entry.clockOut),
      0
    );
    return this.convertSecondsToHours(totalSeconds);
  }
  calculateSeconds(start: Date, end: Date): number {
    return (end.getTime() - start.getTime()) / 1000;
  }

  // Helper function to convert seconds to hours
  convertSecondsToHours(seconds: number): number {
    return seconds / 3600;
  }
}

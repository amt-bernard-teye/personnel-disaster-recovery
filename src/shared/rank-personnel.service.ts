import { State } from "@prisma/client";

export abstract class RankPersonnel {
  static rank(experienceYears: number, projectsCount: number) {
    if (experienceYears >= 10) {
      if (projectsCount >= 20) {
        return State.HIGH;
      }
      else if (projectsCount >= 10) {
        return State.MEDIUM;
      }
      else {
        return State.LOW;
      }
    }
    else if (experienceYears > 5) {
      if (projectsCount >= 10) {
        return State.MEDIUM;
      }
      else {
        return State.LOW;
      }
    }
    
    return State.LOW;
  }
}
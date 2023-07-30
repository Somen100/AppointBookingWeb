export class Users {
    userId: number = 0;
    firstName: string = '';
    lastName: string = '';
    email: string = '';
    password: string = '';
    roleName: string = '';
    roleId: number | undefined = undefined;
    isActive: boolean = true;
    token: string = '';
    userEmail:string='';
  }

  export class LoginModel {
    email: string = '';
    password: string = '';
  }
  
  export class UserRole {
    roleId: number = 0;
    roleName: string = '';
  }
  
  export class Resources {
    resourceId: number = 0;
    name:string='';
    resourceName: string = '';
    description: string = '';
    availability: string = '';
    imageUrl : string='';
  }

  export class Appointments {
    appointmentId: number = 0;
    username:string ='';
    userId: number = 0;
    resourceId: number = 0;
    resourceName:string ='';
    startTime:any ;  // Initialize to a default date or null if needed
    endTime:any ; // Initialize to a default date or null if needed
    isCancelled: boolean = false;
    createdAt:any = new Date(); 
    acquaintanceName:string='';
    clientName:string='';
  }
  
  
  export class Profession{
    resourceId: number=0;
    resourceName:string= '';
    imageUrl:string= '';
  }

  // Teacher Angular Export Class Model
export class Teachers {
  teacherId: number;
  resourceId: number | null;
  teacherName: string;
  isActive: boolean | null;
}

// Doctor Angular Export Class Model
export class Doctors {
  doctorId: number;
  resourceId: number | null;
  doctorName: string;
  isActive: boolean | null;
}

// GymTrainer Angular Export Class Model
export class GymTrainers {
  gymTrainerId: number;
  resourceId: number | null;
  gymTrainerName: string;
  isActive: boolean | null;
}

export class AcquaintanceDetails {
  id: number;
  name: string;
  resourceId: number | null;
  isActive: boolean | null;
}
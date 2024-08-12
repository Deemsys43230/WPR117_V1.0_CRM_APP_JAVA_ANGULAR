// Icons
export const icons = [
    {
        'title': 'Edit',
        'icon': 'fa fa-pencil',
        'bgColor': '#243449',
        'checkVariable': 'status',
        'checkValue': 1
    },
    {
        'title': 'Enable',
        'icon': 'fa fa-unlock',
        'bgColor': '#008000b0',
        'checkVariable': 'status',
        'checkValue': 1
    },
    {
        'title': 'Disable',
        'icon': 'fa fa-lock',
        'bgColor': '#ed3e2fcc',
        'checkVariable': 'status',
        'checkValue': 0
    },
    {
        'title': 'Reset Password',
        'icon': 'fa fa-key',
        'bgColor': '#1d8d97',
    },
    {
        'title': 'View',
        'icon': 'fa fa-eye',
        'bgColor': '#1d8d97'
    },
    {
        'title': 'View Report File',
        'icon': 'fa fa-file',
        'bgColor': '#1d8d97'
    }
]
 
// Items Per Page
export const ItemsPerPage = [
    {
        'data': 'Show 5 Per Page',
        'value': 5
    },
    {
        'data': 'Show 10 Per Page',
        'value': 10
    },
    {
        'data': 'Show 15 Per Page',
        'value': 15
    },
    {
        'data': 'Show 20 Per Page',
        'value': 20
    }
]

export interface TableData{
data : any[],
totalCount : any,
labelName: any[],
tableHeading: any[],
actionButton: any[]
}

//Uses for police department adding new report form --- starts
export const CrashSeverity = [
    {
        value: '1 - FATAL', label: '1 - FATAL'
    },
    {
        value: '2 - INJURY', label: '2 - INJURY'
    },
    {
        value: '3 - PDO', label: '3 - PDO'
    },
    {
        value: '4 - NOT AVAILABLE', label: '4 - NOT AVAILABLE'
    }
]

export const Injuries = [
    {
        value: '1 - NO INJURY / NONE REPORTED', label: '1 - NO INJURY / NONE REPORTED'
    },
    {
        value: '2 - POSSIBLE', label: '2 - POSSIBLE'
    },
    {
        value: '3 - NON-INCAPACITATING', label: '3 - NON-INCAPACITATING'
    },
    {
        value: '4 - INCAPACITATING', label: '4 - INCAPACITATING'
    },
    {
        value: '5 - FATAL', label: '5 - FATAL'
    },
    {
        value: 'X - NOT AVAILABLE', label: 'X - NOT AVAILABLE'
    }
]

export const SeatingPosition = [
    {
        value: '1 -  FRONT - LEFT SIDE (MOTORCYCLE DRIVER)', label: '1 -  FRONT - LEFT SIDE (MOTORCYCLE DRIVER)'
    },
    {
        value: '2 - FRONT - MIDDLE', label: '2 - FRONT - MIDDLE'
    },
    {
        value: '3 - FRONT - RIGHT SIDE', label: '3 - FRONT - RIGHT SIDE'
    },
    {
        value: '4 - SECOND - LEFT SIDE (MOTORCYCLE PASSENGER)', label: '4 - SECOND - LEFT SIDE (MOTORCYCLE PASSENGER)'
    },
    {
        value: '5 - SECOND - MIDDLE', label: '5 - SECOND - MIDDLE'
    },
    {
        value: '6 - SECOND - RIGHT SIDE', label: '6 - SECOND - RIGHT SIDE'
    },
    {
        value: '7 - THIRD - LEFT SIDE (MOTORCYCLE SIDE CAR)', label: '7 - THIRD - LEFT SIDE (MOTORCYCLE SIDE CAR)'
    },
    {
        value: '8 - THIRD - MIDDLE', label: '8 - THIRD - MIDDLE'
    },
    {
        value: '9 - THIRD - RIGHT SIDE', label: '9 - THIRD - RIGHT SIDE'
    },
    {
        value: '10 - SLEEPER SECTION OF CAB (TRUCK)', label: '10 - SLEEPER SECTION OF CAB (TRUCK)'
    },
    {
        value: '11 - PASSENGER IN OTHER ENCLOSED CARGO AREA (NON-TRAILING UNIT SUCH AS A BUS, PICK-UP WITH CAP)', label: '11 - PASSENGER IN OTHER ENCLOSED CARGO AREA (NON-TRAILING UNIT SUCH AS A BUS, PICK-UP WITH CAP)'
    },
    {
        value: '12 - PASSENGER IN UNENCLOSED CARGO AREA', label: '12 - PASSENGER IN UNENCLOSED CARGO AREA'
    },
    {
        value: '13 - TRAILING UNIT', label: '13 - TRAILING UNIT'
    },
    {
        value: '14 - RIDING ON VEHICLE EXTERIOR (NON-TRAILING UNIT)', label: '14 - RIDING ON VEHICLE EXTERIOR (NON-TRAILING UNIT)'
    },
    {
        value: '15 - NON-MOTORIST', label: '15 - NON-MOTORIST'
    },
    {
        value: '16 - OTHER', label: '16 - OTHER'
    },
    {
        value: '99 - UNKNOWN', label: '99 - UNKNOWN'
    },
    {
        value: 'X - NOT AVAILABLE', label: 'X - NOT AVAILABLE'
    },
]
//Uses for police department adding new report form --- ends
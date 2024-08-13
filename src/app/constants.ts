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
        value: '1', label: '1 - FATAL'
    },
    {
        value: '2', label: '2 - INJURY'
    },
    {
        value: '3', label: '3 - PDO'
    },
    {
        value: '4', label: '4 - NOT AVAILABLE'
    }
]

export const Injuries = [
    {
        value: '1', label: '1 - NO INJURY / NONE REPORTED'
    },
    {
        value: '2', label: '2 - POSSIBLE'
    },
    {
        value: '3', label: '3 - NON-INCAPACITATING'
    },
    {
        value: '4', label: '4 - INCAPACITATING'
    },
    {
        value: '5', label: '5 - FATAL'
    },
    {
        value: 'X', label: 'X - NOT AVAILABLE'
    }
]

export const SeatingPosition = [
    {
        value: '1', label: '1 -  FRONT - LEFT SIDE (MOTORCYCLE DRIVER)'
    },
    {
        value: '2', label: '2 - FRONT - MIDDLE'
    },
    {
        value: '3', label: '3 - FRONT - RIGHT SIDE'
    },
    {
        value: '4', label: '4 - SECOND - LEFT SIDE (MOTORCYCLE PASSENGER)'
    },
    {
        value: '5', label: '5 - SECOND - MIDDLE'
    },
    {
        value: '6', label: '6 - SECOND - RIGHT SIDE'
    },
    {
        value: '7', label: '7 - THIRD - LEFT SIDE (MOTORCYCLE SIDE CAR)'
    },
    {
        value: '8', label: '8 - THIRD - MIDDLE'
    },
    {
        value: '9', label: '9 - THIRD - RIGHT SIDE'
    },
    {
        value: '10', label: '10 - SLEEPER SECTION OF CAB (TRUCK)'
    },
    {
        value: '11', label: '11 - PASSENGER IN OTHER ENCLOSED CARGO AREA (NON-TRAILING UNIT SUCH AS A BUS, PICK-UP WITH CAP)'
    },
    {
        value: '12', label: '12 - PASSENGER IN UNENCLOSED CARGO AREA'
    },
    {
        value: '13', label: '13 - TRAILING UNIT'
    },
    {
        value: '14', label: '14 - RIDING ON VEHICLE EXTERIOR (NON-TRAILING UNIT)'
    },
    {
        value: '15', label: '15 - NON-MOTORIST'
    },
    {
        value: '16', label: '16 - OTHER'
    },
    {
        value: '99', label: '99 - UNKNOWN'
    },
    {
        value: 'X', label: 'X - NOT AVAILABLE'
    },
]
//Uses for police department adding new report form --- ends
// Icons
export const icons = [
    {
        'title': 'Edit',
        'icon': 'fa fa-pencil',
        'bgColor': '#243449'
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
        'bgColor': '#1d8d97',
        'checkVariable': 'status',
        'checkValue': 1
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

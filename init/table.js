const table = [
    {
        tableNo: 1,
        booking: [
            {
                customerId : 12101,
                people : 2,
                date : "10-09-2024",
                time : {
                    start : "12:00",
                    end : "1:00"
                }
            },
            
            {
                customerId : 12102,
                people : 3,
                date : "10-09-2024",
                time : {
                    start : "1:00",
                    end : "2:00"
                }
            }
        ]
    },
    {
        tableNo: 2,
        booking: [
            {
                customerId : 12104,
                people : 4,
                date : "11-09-2024",
                time : {
                    start : "2:00",
                    end : "3:00"
                }
            }
        ]
    }
]
module.exports = { data: table };
export async function fetchEventsForMonth(year, month) {
        const token = localStorage.getItem("authToken");
        if(!token){
            return [];
        }

        try {
            const response = await fetch(`http://localhost:8080/api/events?year=${year}&month=${month}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },

            });
            
            if(response.ok){
                const events = await response.json();
                return events;
            }
            else{
                const errorText = await response.text();
                throw new Error(errorText || 'Fetching had a fault.')
            }
        }
        catch (error) {
            //error msg!!
            return [];
        }
    }
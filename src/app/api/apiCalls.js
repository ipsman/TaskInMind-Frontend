
//Event

export async function fetchEventsForMonth(year, month) {
        const token = localStorage.getItem("authToken");
        if(!token){
            return [];
        }

        try {
            const response = await fetch(`http://localhost:8080/api/events?Year=${year}&Month=${month}`, {
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
            alert("Network error: Couldn't communicate with server.");
            return [];
        }
    }


    export async function addEvent(fullStartDate, fullEndDate, title, description, location, color, eventRepeat, eventReminder) {
        try {
          
          const token = localStorage.getItem("authToken");
    
          const response = await fetch('http://localhost:8080/api/events', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}` 
            },
            body: JSON.stringify({
              title: title,
              startDate: fullStartDate, 
              endDate: fullEndDate,     
              description: description,
              location: location,
              color: color,
              repeatEvent: eventRepeat,
              reminderTime: eventReminder
            }),
          });
    
          if (response.status === 204) {
          return null; 
        }
          if (response.ok) {
            const newEvent = await response.json();
            return newEvent;
          } else {
            const errorData = await response.json();
            
            let errorMessage = 'Esemény mentése sikertelen.';
            if (errorData && errorData.message) {
              errorMessage = errorData.message;
            }
            console.error('Esemény mentése sikertelen:', response.status, errorData);
            alert('Error while saving: ' + errorMessage);
            throw new Error(errorMessage);
          }
        } catch (error) {
          console.error('Hálózati hiba:', error);
          alert("Network error: Couldn't communicate with server.");
          throw error;
        }
      }


      export async function deleteEvent(event) {
          try {
              const token = localStorage.getItem("authToken");

              const response = await fetch(`http://localhost:8080/api/events/${event.id}`, {
                  method: 'DELETE',
                  headers: {
                      'Content-Type': 'application/json',
                      'Authorization': `Bearer ${token}` 
                  }
              });

              if (!response.ok) {

                  throw new Error(`A törlés sikertelen. Státuszkód: ${response.status}`);
              }
              console.log(`Esemény sikeresen törölve: ID ${event.id}. Státusz: ${response.status}`);
              

          } catch (error) {
              console.error("Hiba a törlés során:", error);
              alert(`Error occured while deleting. Details: ${error.message}`);
          }
      }


       export async function editEvent(event) {
        try {
          
          const token = localStorage.getItem("authToken");
    
          const response = await fetch(`http://localhost:8080/api/events/${event.id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}` 
            },
            body: JSON.stringify({
              title: event.title,
              startDate: event.fullStartDate, 
              endDate: event.fullEndDate,     
              description: event.description,
              location: event.location,
              color: event.color,
              repeat: event.repeat
            }),
          });
    
          if (response.status === 204) {
          return null; 
        }
          if (response.ok) {
            const newEvent = await response.json();
            return newEvent;
          } else {
            const errorData = await response.json();
            
            let errorMessage = 'Esemény mentése sikertelen.';
            if (errorData && errorData.message) {
              errorMessage = errorData.message;
            }
            console.error('Esemény mentése sikertelen:', response.status, errorData);
            alert('Error occured while saving: ' + errorMessage);
            throw new Error(errorMessage);
          }
        } catch (error) {
          console.error('Hálózati hiba:', error);
          alert("Network error: Couldn't communicate with server.");
          throw error;
        }
      }

// EMail

export async function getEmail(username) {
    const token = localStorage.getItem("authToken");
    if (!token) {
        console.error("Authentication token not found.");
        return null;
    }

    const API_URL = `http://localhost:8080/api/users/getUser/${username}`; 

    try {
        const response = await fetch(API_URL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`, 
            },
        });
        
        
        if (response.ok) {
            const user = await response.json();
            
            if (user && user.email) {
                return user.email;
            } else {
                console.error("API response missing 'email' field.", user);
                return null;
            }
        }
        
        else {
            const errorText = await response.text();
            console.error(`Error fetching user data (Status: ${response.status}): ${errorText}`);
            return null;
        }

    } catch (error) {
        console.error("Network error: Couldn't communicate with server.", error);
        return null;
    }
}


export async function addTask(title, dueDate, priority, description) {
        try {
          
          const token = localStorage.getItem("authToken");
    
          const response = await fetch('http://localhost:8080/api/tasks', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}` 
            },
            body: JSON.stringify({
              title: title,
              dueDate: dueDate, 
              priority: priority,
              description: description
            }),
          });
    
          if (response.status === 204) {
          return null; 
        }
          if (response.ok) {
            const newTask = await response.json();
            return newTask;
          } else {
            const errorData = await response.json();
            
            let errorMessage = 'Esemény mentése sikertelen.';
            if (errorData && errorData.message) {
              errorMessage = errorData.message;
            }
            console.error('Esemény mentése sikertelen:', response.status, errorData);
            alert('Error while saving: ' + errorMessage);
            throw new Error(errorMessage);
          }
        } catch (error) {
          console.error('Hálózati hiba:', error);
          alert("Network error: Couldn't communicate with server.");
          throw error;
        }
      }


export async function fetchTasks() {
        const token = localStorage.getItem("authToken");
        if(!token){
            return [];
        }

        try {
            const response = await fetch(`http://localhost:8080/api/tasks`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },

            });
            
            if(response.ok){
                const tasks = await response.json();
                return tasks;
            }
            else{
                const errorText = await response.text();
                throw new Error(errorText || 'Fetching had a fault.')
            }
        }
        catch (error) {
            alert("Network error: Couldn't communicate with server.");
            return [];
        }
    }

           export async function editTask(task) {
        try {
          
          const token = localStorage.getItem("authToken");
    
          const response = await fetch(`http://localhost:8080/api/tasks/${task.id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}` 
            },
            body: JSON.stringify(task),
          });
    
          if (response.status === 204) {
          return null; 
        }
          if (response.ok) {
            return await response.json();
          } else {
            const errorData = await response.json();
            
            let errorMessage = 'Esemény mentése sikertelen.';
            if (errorData && errorData.message) {
              errorMessage = errorData.message;
            }
            console.error('Esemény mentése sikertelen:', response.status, errorData);
            alert('Error occured while saving: ' + errorMessage);
            throw new Error(errorMessage);
          }
        } catch (error) {
          console.error('Hálózati hiba:', error);
          alert("Network error: Couldn't communicate with server.");
          throw error;
        }
      }


       export async function deleteTask(id) {
          try {
              const token = localStorage.getItem("authToken");

              const response = await fetch(`http://localhost:8080/api/tasks/${id}`, {
                  method: 'DELETE',
                  headers: {
                      'Content-Type': 'application/json',
                      'Authorization': `Bearer ${token}` 
                  }
              });

              if (!response.ok) {

                  throw new Error(`A törlés sikertelen. Státuszkód: ${response.status}`);
              }
              console.log(`Esemény sikeresen törölve: ID ${event.id}. Státusz: ${response.status}`);
              

          } catch (error) {
              console.error("Hiba a törlés során:", error);
              alert(`Error occured while deleting. Details: ${error.message}`);
          }
      }
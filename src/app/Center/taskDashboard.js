'use client'

import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { addTask, fetchTasks, editTask, deleteTask } from '../api/apiCalls';

function TaskDashboard() {
    const date = format(Date(), 'yyyy-MM-dd');

    const [tasks, setTasks] = useState([]);
    const [newTaskText, setNewTaskText] = useState('');
    const [newTaskDescription, setNewTaskDescription] = useState(''); 
    const [newTaskPriority, setNewTaskPriority] = useState('medium'); 
    const [newTaskDueDate, setNewTaskDueDate] = useState(date); 
    const [filter, setFilter] = useState('all');
    const [expandedDescriptionId, setExpandedDescriptionId] = useState(null); 

    useEffect(() => {
    async function loadTasks() {
      try {
        const fetchedTasks = await fetchTasks();
        setTasks(fetchedTasks);
      } catch (error) {
        console.error("Failed to load events:", error);
        setTasks([]);
      }
    }
    loadTasks();
  }, []);


    const handleAddTask = async (e) => {
    e.preventDefault();
    if (!newTaskText.trim()) return;

    try {
        const formattedDueDate = newTaskDueDate ? `${newTaskDueDate}T00:00:00` : null;

        const newTask = await addTask(
            newTaskText.trim(), 
            formattedDueDate,
            newTaskPriority, 
            newTaskDescription.trim()
        );

        
        if (newTask) {
             setTasks(prevTasks => [...prevTasks, newTask]);
             setNewTaskText('');
             setNewTaskDescription('');
             setNewTaskPriority('medium');
             setNewTaskDueDate('');
        }


    } catch (error) {
        console.error("Failed to add task in frontend:", error);
    }
};

    const toggleTask = async (id) => {
        const taskToUpdate = tasks.find(task => task.id === id);

        const updatedTaskLocal = { ...taskToUpdate, completed: !taskToUpdate.completed };

        try{
            const updatedTaskFromApi = await editTask(updatedTaskLocal);

            setTasks(
                tasks.map(
                    task => task.id === id ? updatedTaskFromApi : task
                )
            );
        }
        catch (error){
            console.error(error);
        }
    };

    const handleDeleteTask = async (id) => {
        try{
            deleteTask(id);
            setTasks(tasks.filter(task => task.id !== id));
        }
        catch (error){
            console.error(error);
        }
 
    };

    const toggleDescription = (id) => {
        setExpandedDescriptionId(expandedDescriptionId === id ? null : id);
    };

    const getFilteredTasks = () => {
        let filtered = tasks;

        switch (filter) {
            case 'active':
                filtered = tasks.filter(task => !task.completed);
                break;
            case 'completed':
                filtered = tasks.filter(task => task.completed);
                break;
            case 'high':
                filtered = tasks.filter(task => task.priority === 'high' && !task.completed);
                break;
            case 'all':
            default:
                break;
        }
        
        return filtered.sort((a, b) => {
            if (a.completed !== b.completed) {
                return a.completed ? 1 : -1;
            }
            if (a.priority === 'high' && b.priority !== 'high') return -1;
            if (a.priority !== 'high' && b.priority === 'high') return 1;

            const dateA = a.dueDate ? new Date(a.dueDate).getTime() : Infinity;
            const dateB = b.dueDate ? new Date(b.dueDate).getTime() : Infinity;
            return dateA - dateB;
        });
    };

    const filteredTasks = getFilteredTasks();

    const getFilterButtonClass = (filterName) => {
        return `p-3 text-left rounded-lg transition-colors duration-150 w-full ${
            filter === filterName 
                ? 'bg-blue-600 text-white shadow-md font-semibold'
                : 'hover:bg-gray-700/50 dark:hover:bg-gray-800 text-gray-400'
        }`;
    };

    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'high': return 'bg-red-600/10 text-red-500 border-red-500';
            case 'medium': return 'bg-yellow-600/10 text-yellow-500 border-yellow-500';
            case 'low': return 'bg-green-600/10 text-green-500 border-green-500';
            default: return 'bg-gray-600/10 text-gray-500 border-gray-500';
        }
    };
    
    const getNewPriorityButtonClass = (priority) => {
        let baseClass = 'px-4 py-2 text-sm rounded-lg font-semibold transition duration-150 border-2 ';
        if (newTaskPriority === priority) {
            switch (priority) {
                case 'high': return baseClass + 'bg-red-600 text-white border-red-600 shadow-lg';
                case 'medium': return baseClass + 'bg-yellow-600 text-white border-yellow-600 shadow-lg';
                case 'low': return baseClass + 'bg-green-600 text-white border-green-600 shadow-lg';
            }
        } else {
            switch (priority) {
                case 'high': return baseClass + 'text-red-500 border-red-500 hover:bg-red-500/10';
                case 'medium': return baseClass + 'text-yellow-500 border-yellow-500 hover:bg-yellow-500/10';
                case 'low': return baseClass + 'text-green-500 border-green-500 hover:bg-green-500/10';
            }
        }
    }

    const formatDueDate = (dateString) => {
        if (!dateString) return 'No Date';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    };
    
    const isDueSoon = (dateString) => {
        if (!dateString) return false;
        const now = new Date();
        now.setHours(0, 0, 0, 0); 
        const due = new Date(dateString);
        due.setHours(0, 0, 0, 0); 
        const diffDays = Math.ceil((due - now) / (1000 * 60 * 60 * 24));
        
        return diffDays <= 3;
    }

    const scrollbarHiddenStyle = {
        'WebkitOverflowScrolling': 'touch',
        'msOverflowStyle': 'none',  
        'scrollbarWidth': 'none',   
    };

    return (
        <div className='flex'>
            <div className="w-full shadow-md rounded-lg m-1 p-3 dark:bg-[#000000b9] bg-gray-100/90 text-gray-800 dark:text-gray-300 min-h-screen">
                
                <h1 className="text-4xl font-extrabold mb-8 text-gray-800 dark:text-white border-b border-gray-300 dark:border-gray-700 pb-2">
                    Task Dashboard
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-6">
                    <aside className="p-5 rounded-xl dark:bg-gray-800 bg-white shadow-lg border border-gray-200 dark:border-gray-700 h-fit">
                        <h2 className="text-xl font-semibold mb-4 dark:text-gray-200">Task Views</h2>
                        <nav className="flex flex-col gap-2">
                            <button className={getFilterButtonClass('all')} onClick={() => setFilter('all')}>
                                All Tasks
                            </button>
                            <button className={getFilterButtonClass('active')} onClick={() => setFilter('active')}>
                                Pending Tasks ({tasks.filter(t => !t.completed).length})
                            </button>
                            <button className={getFilterButtonClass('completed')} onClick={() => setFilter('completed')}>
                                Completed Tasks
                            </button>
                            <div className="h-px bg-gray-300 dark:bg-gray-700 my-3"></div>
                            <button className={getFilterButtonClass('high')} onClick={() => setFilter('high')}>
                                High Priority
                            </button>
                        </nav>
                    </aside>
                    <main className="space-y-6">
                        <form onSubmit={handleAddTask} className="flex flex-col gap-4 p-5 rounded-xl dark:bg-gray-800 bg-white shadow-lg border border-gray-200 dark:border-gray-700">
                            <h4 className="text-lg font-semibold dark:text-gray-200">Add New Task</h4>
                            <input
                                type="text"
                                placeholder="Enter the task title (required)..."
                                value={newTaskText}
                                onChange={(e) => setNewTaskText(e.target.value)}
                                className="w-full p-3 rounded-lg border-2 border-gray-300 dark:border-gray-700 dark:bg-gray-900 focus:outline-none focus:border-blue-500 dark:text-gray-200"
                            />
                            <textarea
                                placeholder="Add a detailed description (optional)..."
                                value={newTaskDescription}
                                onChange={(e) => setNewTaskDescription(e.target.value)}
                                rows="3"
                                className="w-full p-3 rounded-lg border-2 border-gray-300 dark:border-gray-700 dark:bg-gray-900 focus:outline-none focus:border-blue-500 dark:text-gray-200 resize-none"
                            />
                            <div className='flex flex-col md:flex-row md:items-center justify-between gap-4 pt-1'>
                                <div className='flex items-center gap-2'>
                                    <span className="text-sm font-medium dark:text-gray-400">Priority:</span>
                                    <button type="button" onClick={() => setNewTaskPriority('high')} className={getNewPriorityButtonClass('high')}>High</button>
                                    <button type="button" onClick={() => setNewTaskPriority('medium')} className={getNewPriorityButtonClass('medium')}>Medium</button>
                                    <button type="button" onClick={() => setNewTaskPriority('low')} className={getNewPriorityButtonClass('low')}>Low</button>
                                </div>

                                <div className='flex items-center gap-2'>
                                    <span className="text-sm font-medium dark:text-gray-400">Deadline:</span>
                                    <input
                                        type="date"
                                        value={newTaskDueDate}
                                        onChange={(e) => setNewTaskDueDate(e.target.value)}
                                        className="p-2 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-900 focus:outline-none focus:border-blue-500 dark:text-gray-200 text-sm"
                                    />
                                </div>
                                
                                <button
                                    type="submit"
                                    className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition duration-150 disabled:bg-gray-500 md:self-end"
                                    disabled={!newTaskText.trim()}
                                >
                                    Add Task
                                </button>
                            </div>
                        </form>
                        <div className="space-y-3">
                            <h2 className="text-2xl font-semibold dark:text-gray-200">
                                {filter === 'all' ? 'All Tasks' : (filter === 'active' ? 'Pending Tasks' : (filter === 'completed' ? 'Completed Tasks' : 'High Priority Tasks'))}
                                <span className="ml-2 text-gray-500 dark:text-gray-400 text-lg">
                                    ({filteredTasks.length})
                                </span>
                            </h2>
                            <div className='overflow-y-auto max-h-[42vh] space-y-2' style={{ ...scrollbarHiddenStyle }}>
                            {filteredTasks.length === 0 ? (
                                <p className="p-4 text-center dark:text-gray-400 border border-gray-700/50 rounded-xl dark:bg-gray-800/50">
                                    Great job! You have no {filter === 'completed' ? 'completed' : 'pending'} tasks.
                                </p>
                            ) : (
                                
                                filteredTasks.map(task => (
                                    <div key={task.id}>
                                        <div 
                                            className={`
                                                flex items-center justify-between p-4 rounded-xl shadow-sm transition duration-200 
                                                dark:bg-gray-800 bg-white border border-gray-200 dark:border-gray-700 
                                                ${task.completed ? 'opacity-60 line-through' : 'hover:shadow-lg'}
                                                ${expandedDescriptionId === task.id ? 'rounded-b-none' : ''}
                                            `}
                                        >
                                            <div className="flex items-center gap-4 flex-grow">
                                                <input
                                                    type="checkbox"
                                                    checked={task.completed}
                                                    onChange={() => toggleTask(task.id)}
                                                    className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 cursor-pointer"
                                                />
                                                <span className="text-lg dark:text-gray-200 flex-grow">{task.title}</span>
                                                <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${getPriorityColor(task.priority)}`}>
                                                    {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                                                </span>
                                                {task.dueDate && (
                                                    <span 
                                                        className={`text-xs font-semibold px-3 py-1 rounded-full border 
                                                                    ${isDueSoon(task.dueDate) && !task.completed 
                                                                        ? 'bg-red-500 text-white border-red-500' 
                                                                        : 'dark:bg-gray-700/50 dark:text-gray-400 bg-gray-200 text-gray-700 border-gray-400'
                                                                    }`}
                                                    >
                                                        Due: {formatDueDate(task.dueDate)}
                                                    </span>
                                                )}
                                            </div>
                                            <div className='flex gap-1 ml-4'>
                                                {task.description.length > 0 && (
                                                    <button 
                                                        onClick={() => toggleDescription(task.id)}
                                                        className={`p-2 transition-colors rounded ${expandedDescriptionId === task.id ? 'text-blue-500' : 'text-gray-400 hover:text-blue-500'}`}
                                                        title="Toggle Description"
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                                                        </svg>
                                                    </button>
                                                )}
                                                <button 
                                                    onClick={() => handleDeleteTask(task.id)}
                                                    className="p-2 text-gray-400 hover:text-red-500 transition-colors rounded"
                                                    title="Delete"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                        {expandedDescriptionId === task.id && (
                                            <div className="p-4 bg-gray-100 dark:bg-gray-800/80 border border-t-0 border-gray-300 dark:border-gray-700 rounded-b-xl text-sm italic dark:text-gray-400 transition-all duration-300 ease-in-out">
                                                <p className='font-semibold mb-1'>Details:</p>
                                                {task.description || "No detailed description provided."}
                                            </div>
                                        )}
                                    </div>
                                ))
                                
                            )}</div>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
}

export default TaskDashboard;
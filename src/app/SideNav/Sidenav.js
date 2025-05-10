    'use client'

const Sidenav = () => {

    const navigation = [
        { name: "Home", id: 'homeTitle', num: '0'},
        { name: "About Me", id: 'nabTitle', num: '1'},
        { name: "How It's Made", id: 'nhTitle', num: '2'},
        { name: "End", id: 'endTitle', num: '3'},
    ];

    const listItems = navigation.map(item =>
        <li id={item.id} key={item.name}><button className="px-3" onClick={() => GoAnchor(item.num)} >{item.name}</button></li>
    );

    return (
        <div className="flex flex-col h-full w-[250px]">
            <div className="space-y-3 h-full">
                <div className="flex items-center justify-between">
                    <h2 className="font-bold">Calendar</h2>
                    <button className="p-2">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-5 h-5 fill-amber-50 dark:text-gray-800">
                            <rect width="352" height="32" x="80" y="96"></rect>
                            <rect width="352" height="32" x="80" y="240"></rect>
                            <rect width="352" height="32" x="80" y="384"></rect>
                        </svg>
                    </button>
                </div>
                <div className="flex-1">
                    <ul className="pt-2 pb-4 space-y-1">
                        {listItems}
                    </ul>
                </div>
            </div>
            <div className="flex items-center p-2 mt-12 space-x-4 justify-self-end">
                <img src="https://picsum.photos/200/300" alt="" className="w-12 h-12 rounded-lg dark:bg-gray-500" />
                <div>
                    <h2 className="text-lg font-semibold">Leroy Jenkins</h2>
                    <span className="flex items-center space-x-1">
                        <a rel="noopener noreferrer" href="#" className="text-xs hover:underline dark:text-amber-50">View profile</a>
                    </span>
                </div>
            </div>
        </div>
    );
  }
  export default Sidenav;
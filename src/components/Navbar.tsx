// "use client"
// import React,{useState} from 'react'
// import { useRouter } from 'next/navigation'
// import Link from 'next/link'
// import { MovieCardProps } from './MovieCard';

// const Navbar = () => {
//     const [input,setInput] =  useState("")
//     const router = useRouter()

//     const searchMovie = (e: React.FormEvent<HTMLFormElement>) =>{
//         e.preventDefault()
//         router.push(`?movie=${input}`)
//         setInput("")
//     };


   
  
//     const API_URL = "https://api.themoviedb.org/3/movie/popular?api_key=b185e98f105904fe4f059fa1942e06f4"
//     const [query, setquery] = useState("")
//     const [searchMovies, setSearchMovies] = useState<MovieCardProps[]>([]);
//     async function handlesearch() {


//         const [isCustomerSearching, setIsCustomerSearching] = useState(false);
//         const api_search = `https://api.themoviedb.org/3/search/movie?query=${query}&api_key=b185e98f105904fe4f059fa1942e06f4`
//         const queryParams = new URLSearchParams({ api_key: api_search, q: query });
//         try {
//             const response = await fetch(`${api_search}`);
//             if (!response.ok) {
//                 throw new Error('Network response was not ok');
//             }
//             const data = await response.json();
//             setSearchMovies(data.results)
//             setIsCustomerSearching(true)
//             setquery("")
//             // rou
//             console.log(data.results)
    
//         } catch (error) {
//             console.error('Error fetching data:', error);
//             throw error;
//         }
    
//     }

    

    
//   return <div className="bg-blue-500 py-4 px-4 md:px-0">
//     <div className="container mx-auto flex justify-between items-center">

//         <Link href="/">
//             <div className="text-[30px] font-medium">Movie Zone</div>
//         </Link>

//         <form onSubmit={searchMovie}>
//         <div className="justify-center flex-row items-center pt-7 flex">

     
//      <input type='text' value={query} onChange={(e) =>
//          setquery(e.target.value)} 
//          placeholder='Search movies...'
//          className=" text-black 
//          border border-gray-300 
//          rounded-1 py-2 px-4 w-96 
//          focus:outline-none focus:border-blue-500">

//          </input>
//      <button onClick={handlesearch}
//       className='bg-red-600 text-white
//        py-2 px-6 rounded-r hover:bg-blue-600 focus:outline-none'>
//         Search
//         </button>
//      </div>
//         </form>
//          </div>
//          </div>
  
// };




// export default Navbar
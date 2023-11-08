


// "use client"
// import { useState, useEffect } from 'react';
// import { MovieCardProps } from './MovieCard';
// // import MovieCard from './MovieCard';
// import Search from './Search';
// import Link from 'next/link'
// // import { useRouter } from 'next/router';


// export type Movie = {
//   id: number;
//   poster_path: string;
//   original_title: string;
//   title: string;
//   overview: string;
//   release_date: string;
//   vote_average: number;
//   onClick: () => void;
// };

//  export const MovieCard: React.FC<Movie> = ({
//   poster_path,
//   title,
//   release_date,
//   vote_average,
//   onClick,
//   id,
// }) => {
//   const API_IMG = "https://image.tmdb.org/t/p/w500/";
//   const [picked,setpicked] = useState<MovieCardProps | null>(null); 
//   const [isPicked, setIsPicked] = useState(false)
//   const [ids, setid]=useState(0)

//   async function pick() {
//     const api_pick = `https://api.themoviedb.org/3/movie/${id}?&api_key=b185e98f105904fe4f059fa1942e06f4`;
//     try {
//       const response = await fetch(api_pick);
//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }
//       const data = await response.json();
      
//       setpicked(data);
//       if(isPicked===false){
//       setIsPicked(true);}
//       else{setIsPicked(false)}
//     } catch (error) {
//       console.error('Error fetching data:', error);
//       throw error;
//     }
//   }
//   useEffect(() => {
//     console.log(picked);
//   }, [picked]);

//   return (
//     <div style={{ cursor: 'pointer' }}>
// <Link href={`/details/${id}`}> <img src={API_IMG + poster_path} alt={title}  className="ml-6  w-32 md:w-60 md:h-70 object-cover rounded-t-lg pt-5,ml-80" /></Link>
//       <div className="flex items-center gap-10">
//         <p className="text-white ml-6">{release_date}</p>
//         <p className="ml-50 text-white">{"Rating: " + vote_average}</p>
//         <p  onChange={(e) => setid(id)}></p>
//       </div>
//       <h2 className="text-l font-sm text-white text-2xlmb-2 ml-6" >{title}</h2>
//       {/* {isPicked?<div className=''>{picked?.overview}</div> :null} */}
//     </div>
//   );
// };

// const Index: React.FC = () => {
  
//   const API_URL = "https://api.themoviedb.org/3/movie/popular?api_key=b185e98f105904fe4f059fa1942e06f4"
  
//   const [movies, setMovies] = useState<MovieCardProps[]>([]);
//   const [searchMovies, setSearchMovies] = useState<MovieCardProps[]>([]);
//   const [isCustomerSearching, setIsCustomerSearching] = useState(false);
//   const [query, setquery] = useState("")
 

//   async function handlesearch() {
//     const api_search = `https://api.themoviedb.org/3/search/movie?query=${query}&api_key=b185e98f105904fe4f059fa1942e06f4`
//     const queryParams = new URLSearchParams({ api_key: api_search, q: query });
//     try {
//         const response = await fetch(`${api_search}`);
//         if (!response.ok) {
//             throw new Error('Network response was not ok');
//         }
//         const data = await response.json();
//         setSearchMovies(data.results)
//         setIsCustomerSearching(true)
//         setquery("")
//         console.log(data.results)

//     } catch (error) {
//         console.error('Error fetching data:', error);
//         throw error;
//     }

// }

//   useEffect(() => {
//     const fetchMovies = async () => {
//       try {
//         const response = await fetch(API_URL);
//         if (response.ok) {
//           const data = await response.json();
//           //   console.log(data.results)
//           setMovies(data.results);
//         } else {
//           console.error('Failed to fetch data');
//         }
//       } catch (error) {
//         console.error('Error fetching data', error);
//       }
//     };

//     fetchMovies();
//   }, [API_URL]);

//   console.log(movies)

//   return isCustomerSearching ? (
//     <div className="bg-gray-900 text-white">
//       <div className="bg-blue-500 p-4 md:px-0">
//         <div className="container mx-auto flex justify-between items-center">
//           <Link href="/">
//             <div className="text-2xl md:text-3xl font-medium ml-4 md:ml-10">Movie Zone</div>
//            </Link>
//            <input
//             type="text"
//              value={query}
//              onChange={(e) => setquery(e.target.value)}
//             placeholder="Search movies..."
//            className="text-black border border-gray-300 rounded py-2 px-4 w-64 md:w-96 focus:outline-none focus:border-blue-500"
//           />
//            <button
//            onClick={handlesearch}
//             className="bg-red-600 text-white py-2 px-6 rounded-r hover:bg-blue-600 focus:outline-none"
//          >
//             Search
//            </button>
//        </div>
//       </div>
// <Search searchMovies={searchMovies} />
//  </div>
    
//   ) : (
//     <div className="bg-gray-900">
//       <div className="bg-blue-500 p-4 md:px-0">
//         <div className="container mx-auto flex justify-between items-center">
//           <Link href="/">
//             <div className="text-2xl md:text-3xl font-medium ml-4 md:ml-10">Movie Zone</div>
//           </Link>
//           <input
//             type="text"
//             value={query}
//             onChange={(e) => setquery(e.target.value)}
//             placeholder="Search movies..."
//             className="text-black border border-gray-300 rounded py-2 px-4 w-64 md:w-96 focus:outline-none focus:border-blue-500"
//           />
//           <button
//             onClick={handlesearch}
//             className="bg-red-600 text-white py-2 px-6 rounded-r hover:bg-blue-600 focus:outline-none"
//           >
//             Search
//           </button>
//         </div>
//       </div>
//       <h1 className="text-4xl font-bold text-center md:text-left pt-8 md:pt-20 text-red-500">Welcome to Movie Zone</h1>
//       <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 ml-4 md:ml-5">
//         {movies.map((moviereq) => (
//           <MovieCard
//             key={moviereq.id}
//             id={moviereq.id}
//             title={moviereq.title}
//             overview={moviereq.overview}
//             poster_path={moviereq.poster_path}
//             release_date={moviereq.release_date}
//             vote_average={moviereq.vote_average}
//             original_title={moviereq.original_title}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Index;

"use client"
import { useState, useEffect } from 'react';
import { MovieCardProps } from './MovieCard';
import Search from './Search';
import Link from 'next/link'
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { movieActions } from '@/redux/slices/movieSlice';



export type Movie = {
  id: number;
  poster_path: string;
  original_title: string;
  title: string;
  overview: string;
  release_date: string;
  vote_average: number;
  onClick: () => void;
};

 export const MovieCard: React.FC<Movie> = ({
  poster_path,
  title,
  release_date,
  vote_average,
  onClick,
  id,
}) => {
  const API_IMG = "https://image.tmdb.org/t/p/w500/";
  const [picked,setpicked] = useState<MovieCardProps | null>(null); 
  const [isPicked, setIsPicked] = useState(false)
  const [ids, setid]=useState(0)

 

  async function pick() {
    const api_pick = `https://api.themoviedb.org/3/movie/${id}?&api_key=b185e98f105904fe4f059fa1942e06f4`;
    try {
      const response = await fetch(api_pick);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
    

      setpicked(data);
      if(isPicked===false){
      setIsPicked(true);}
      else{setIsPicked(false)}
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  }
  useEffect(() => {
    console.log(picked);
  }, [picked]);

  return (
    <div style={{ cursor: 'pointer' }}>
<Link href={`/details/${id}`}> <img src={API_IMG + poster_path} alt={title}  className="ml-6 w-32 md:w-60 md:h-70 object-cover rounded-t-lg pt-5" /></Link>
      <div className="flex items-center gap-10">
        <p className="text-white ml-6">{release_date}</p>
        <p className="ml-50 text-white">{"Rating: " + vote_average}</p>
        <p  onChange={(e) => setid(id)}></p>
      </div>
      <h2 className="text-l font-sm text-white text-2xlmb-2 ml-6" >{title}</h2>
      {/* {isPicked?<div className=''>{picked?.overview}</div> :null} */}
    </div>
  );
};

const Index: React.FC = () => {
  
  const API_URL = "https://api.themoviedb.org/3/movie/popular?api_key=b185e98f105904fe4f059fa1942e06f4"
  
  const [movies, setMovies] = useState<MovieCardProps[]>([]);
  const [searchMovies, setSearchMovies] = useState<MovieCardProps[]>([]);
  const [isCustomerSearching, setIsCustomerSearching] = useState(false);
  const [query, setquery] = useState("")
  const [loading,setLoading] = useState(true);

  const dispatch = useAppDispatch();
  const {data} = useAppSelector(state => state.movies);
 

  async function handlesearch() {
    const api_search = `https://api.themoviedb.org/3/search/movie?query=${query}&api_key=b185e98f105904fe4f059fa1942e06f4`
    const queryParams = new URLSearchParams({ api_key: api_search, q: query });
    try {
        const response = await fetch(`${api_search}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        dispatch(movieActions.setData(data));
        setSearchMovies(data.results)
        setIsCustomerSearching(true)
        // setquery("")
        console.log(data.results)

    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }

}

useEffect(()=>{
  if(query.length > 0){
    handlesearch()
  }
}, [query])

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(API_URL);
        if (response.ok) {
          const data = await response.json();
          //   console.log(data.results)
          setMovies(data.results);
          dispatch(movieActions.setData(data));
        } else {
          console.error('Failed to fetch data');
        }
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };

    fetchMovies();
  }, [API_URL]);

  console.log(movies)

  return isCustomerSearching ? (
    <div className="w-full h-700 bg-gray-900 text-white">
{/* <div className="bg-blue-500 py-4 px-4 md:px-0"> 
     <div className="container mx-auto flex justify-between items-center"> 

         <Link href="/">
            <div className="text-[30px] font-medium">Movie Zone</div>
        </Link> 
      <div className="justify-center flex-row items-center flex ">
      <button onClick={() => setIsCustomerSearching(false)} className='bg-red-600 text-white 
      py-2 px-6 rounded-r hover:bg-blue-600 focus:outline-none'>Back</button> 
         <input type='text' value={query} onChange={(e) => setquery(e.target.value)} placeholder='Search movies...'
        className="border border-gray-300 rounded-1 py-2 px-4 w-96 focus:outline-none focus:border-blue-500 text-black"></input>
        <button onClick={handlesearch} className='bg-red-600 text-bla py-2 px-6 rounded-r hover:bg-blue-600 focus:outline-none'>Search</button>
       </div> 
       </div> 
       </div> */}

       
     
<div className="bg-blue-500 py-4 px-4 md:px-0">
    <div className="container mx-auto flex justify-between items-center">

        <Link href="/">
            <div className="text-[30px] font-medium">Movie Zone</div>
        </Link>
  <input type='text'
   value={query}
    onChange={(e) => setquery(e.target.value)}
    placeholder='Search movies...'
    className=" text-black 
    border border-gray-300 
    rounded-1 
    py-2 px-4 w-96 
    focus:outline-none 
    focus:border-blue-500

    ">
    </input>
  {/* <button onClick={handlesearch} className='bg-red-600 text-white py-2 px-6 rounded-r hover:bg-blue-600 focus:outline-none mr-20'>Search</button> */}
 
</div>
</div>


      <Search searchMovies={searchMovies}/>
      
    </div>
    
  ) :<div className="w-full h-700 bg-gray-900 ">
    <div className="justify-center flex-row items-center flex">

    <div className="bg-blue-500 py-4 px-4 md:px-0 w-full">
    <div className="container mx-auto flex justify-between items-center">

        <Link href="/">
            <div className="text-[30px] font-medium">Movie Zone</div>
        </Link>
  <input type='text'
   value={query}
    onChange={(e) => setquery(e.target.value)}
    placeholder='Search movies...'
    className=" text-black 
    border border-gray-300 
    rounded-1 
    py-2 px-4 w-96 
    focus:outline-none 
    focus:border-blue-500

    ">
    </input>
  {/* <button onClick={handlesearch} className='bg-red-600 text-white py-2 px-6 rounded-r hover:bg-blue-600 focus:outline-none mr-20'>Search</button> */}
 
</div>
</div>
</div>
<h1 className="text-4xl font-bold flex justify-center mb-10 pt-20 text-red-500">Welcome</h1>
<div className="grid h-full sm:screen grid-cols-2 md:grid-cols-3  lg:grid-cols-5 justify-between sm:grid-2 mr-10">
{/* grid sm:grid-cols-2 md:grid-cols-3 ml-3 lg:grid-cols-5 mr-20 justify-center w-fit gap-4  */}
  {movies.map((moviereq) => (
    <MovieCard key={moviereq.id}
      id={moviereq.id}
      title={moviereq.title}
      overview={moviereq.overview}
      poster_path={moviereq.poster_path}
      release_date={moviereq.release_date}
      vote_average={moviereq.vote_average}
      original_title={moviereq.original_title}
      onClick={moviereq.onClick}
    />
  ))}
</div>
</div>;
};

export default Index;

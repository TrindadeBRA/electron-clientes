import { useQuery } from "@tanstack/react-query";
export default function About() {
  const { data, isFetching } = useQuery({
    queryKey: ["version-app"], queryFn: async () => {
      const response = await window.api.getVersion();
      return response;
    }
  })
  return (
    <div className='flex-1 flex flex-col py-12 px-10 text-white'>
      <h1 className='text-white text-x1 1g: text-3x1 font-semibold mb-4'>
        Página sobre
      </h1>
      <p>Versão atual do projeto: {!isFetching && data && data}</p>
    </div>
  )
}
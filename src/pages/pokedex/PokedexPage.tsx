export default function PokedexPage() {
  return (
    <div className="flex-1 flex flex-col gap-4 max-w-96 mx-auto">
      <div className="relative">
        <img
          className="mx-auto object-contain duration-200
          mask-x-from-95% mask-x-to-100% mask-y-from-95% mask-y-to-100%"
          src="/whosthatpokemon.jpg"
        />
      </div>
      <div className="p-4 bg-yellow-200/80 border border-black text-black rounded-md">
        <p className="text-center">Whos that pokemon!</p>
      </div>
    </div>
  );
}

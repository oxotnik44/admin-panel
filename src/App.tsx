import { AppRouter } from "./app/routes/ui/AppRouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Navbar } from "./modules/Navbar";
function App() {
  const queryClient = new QueryClient();
  return (
    <div className="grid grid-cols-[250px_1fr] h-screen w-screen  overflow-aut">
      <QueryClientProvider client={queryClient}>
        <Navbar />
        <AppRouter />
      </QueryClientProvider>
    </div>
  );
}

export default App;

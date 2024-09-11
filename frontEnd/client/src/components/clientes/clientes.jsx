import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Example from "./example";

const queryClient = new QueryClient();

const Clientes = () => (
  <QueryClientProvider client={queryClient}>
    <Example />
  </QueryClientProvider>
);

export default Clientes;


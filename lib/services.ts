import { mainServices as localServices } from '@/data/services';

export async function getServices() {
  // Por ahora, simplemente devuelve los datos locales
  // En el futuro, aquí podrías hacer una llamada a una API
  return localServices;
}

export async function getServiceById(id: string) {
  const services = await getServices();
  return services.find(p => p.id === id);
}
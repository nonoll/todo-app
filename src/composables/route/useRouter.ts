import { SetupContext, provide, inject } from '@vue/composition-api'
import { RouteService } from '@/services/RouteService'

const RouterToken = Symbol('RouterToken')

export const provideRouter = (context: SetupContext): RouteService => {
  const service = new RouteService(context)
  provide(RouterToken, service)
  return service
}

export const useRouter = () => {
  const routeService: RouteService = inject(RouterToken) as RouteService
  if (!routeService) {
    console.error('no router provided')
  }
  return routeService.expose()
}

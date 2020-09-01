import VueRouter, { Route } from 'vue-router'
import { Subject, Observable } from 'rxjs'
import { SetupContext, Ref, ref, watch } from '@vue/composition-api'

export interface RouteUpdated {
  to: Route;
  from: Route;
}

export interface RouteExpose {
  router: VueRouter;
  route: Ref<Route>;
  observeRouteUpdated: Observable<RouteUpdated>;
}

export class RouteService {
  protected context: SetupContext
  protected router: VueRouter
  protected route: Ref<Route>
  protected routeUpdatedSubject: Subject<RouteUpdated>

  constructor (context: SetupContext) {
    this.context = context
    this.router = context.root.$router
    this.route = ref(this.copyRoute(this.router.currentRoute))
    this.routeUpdatedSubject = new Subject()
    this.watchRouteUpdated()
  }

  watchRouteUpdated () {
    watch(
      () => this.context.root.$route,
      (to: Route, from: Route) => {
        this.route.value = to
        this.routeUpdatedSubject.next({ to, from })
      }
    )
  }

  setRoute (route: Route) {
    this.route.value = this.copyRoute(route)
  }

  copyRoute (route: Route) {
    return {
      ...route,
      name: route.name,
      path: route.path,
      fullPath: route.fullPath,
      params: Object.assign({}, route.params)
    }
  }

  expose (): RouteExpose {
    return {
      router: this.router,
      route: this.route,
      observeRouteUpdated: this.routeUpdatedSubject.asObservable()
    }
  }
}

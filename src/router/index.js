import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "@/views/Dashboard.vue";
import Patient from "@/views/Patient/Patient.vue";
import Billing from "@/views/Billing.vue";
import VirtualReality from "@/views/VirtualReality.vue";
import Profile from "@/views/Profile.vue";
import Rtl from "@/views/Rtl.vue";
import SignIn from "@/views/SignIn/SignIn.vue";
import { isAuthenticated } from "@/helpers";

const routes = [
  {
    path: "/sign-in",
    name: "Sign In",
    component: SignIn,
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
  },
  {
    path: "/patients",
    name: "Patients",
    component: Patient,
    children: [
      {
        path: "list",
        name: "patient-list",
        component: () => import('@/views/Patient/PatientList.vue')
      },
      {
        path: "create",
        name: 'patient-create',
        component: () => import('@/views/Patient/PatientCreate.vue')
      },
      {
        path: ":id/edit",
        name: 'patient-edit',
        component: () => import('@/views/Patient/PatientEdit.vue')
      },
      {
        path: ":id/details",
        name: 'patient-details',
        component: () => import('@/views/Patient/PatientDetails.vue')
      },
    ]
  },
  {
    path: "/billing",
    name: "Billing",
    component: Billing,
  },
  {
    path: "/virtual-reality",
    name: "Virtual Reality",
    component: VirtualReality,
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
  },
  {
    path: "/rtl-page",
    name: "Rtl",
    component: Rtl,
  },
  {
    path: "/logout",
    name: "Logout",
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: "active",
});

router.beforeEach(async (to, from, next) => {
  const logged = await isAuthenticated();

  if (logged && to.name === 'Sign In') {
    next('/dashboard')
  } else if ((logged && to.name === 'Logout') || (!logged && to.name !== 'Sign In')) {
    localStorage.removeItem('token')
    next('/sign-in')
  } else {
    next()
  }
})

export default router;

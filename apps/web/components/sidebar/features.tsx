import { useUserMeCache } from "@/servers/base/user";
import { useMemo } from "react";
import { HomeIcon } from "@/assets/icons/sidebar/home.icon";
import { Archive, List, SquareLibrary } from "lucide-react";
import { PermissionAction, TRoutes } from "@/types/base";

export const useSidebarFeatures = () => {
    const { user: { data } } = useUserMeCache();

    // Helper to check permission without hook calls
    const hasPermission = (resource?: string, action: PermissionAction = "read") => {
        if (!resource) return true;
        return data?.permissions?.some(
            (perm) =>
                perm.permission.toLowerCase() === resource.toLowerCase() &&
                perm.actions.includes(action as any)
        );
    };

    // Recursive filter using plain function
    function filterRoutesByPermission(routes: TRoutes[]): TRoutes[] {
        return routes
            .map((route) => {
                const filteredChildren = route.children?.length
                    ? filterRoutesByPermission(route.children)
                    : [];

                if (route.resource && !hasPermission(route.resource, "read")) {
                    return null; // hide this route
                }

                return { ...route, children: filteredChildren };
            })
            .filter(Boolean) as TRoutes[];
    }

    const routes = useMemo(() => {
        const links: TRoutes[] = [
            {
                path: "/dashboard",
                title: "Dashboard",
                icon: <HomeIcon />,
                id: 1,
                hasChild: true,
                children: [],
                resource: "dashboard",
            },
            {
                path: "/sections",
                title: "Sections",
                icon: <HomeIcon />,
                id: 2,
                hasChild: false,
                children: [
                    {
                        path: "/departments",
                        title: "Departments",
                        icon: <SquareLibrary size={16} strokeWidth={1.5} />,
                        id: 22,
                        hasChild: false,
                        children: [],
                        resource: "department",
                    },
                    {
                        path: "/categories",
                        title: "Categories",
                        icon: <List strokeWidth={1.5} size={16} />,
                        id: 22,
                        hasChild: false,
                        children: [],
                        resource: "category",
                    },
                    {
                        path: "/storages",
                        title: "Storages",
                        icon: <Archive size={16} strokeWidth={1.5} />,
                        id: 21,
                        hasChild: false,
                        children: [],
                        resource: "storage",
                    },

                ],
            },
        ];

        return filterRoutesByPermission(links);
    }, [data]); // rerun when user data changes

    return { routes };
};

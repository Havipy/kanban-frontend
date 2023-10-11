import AuthLayout from "../layouts/authLayout/AuthLayout";
import HomePage from "../pages/homePage/HomePage";
import Login from "../pages/login/Login";
import Registration from "../pages/registration/Registration";
import BoardsMenuLayout from "../layouts/boardsMenuLayout/BoardsMenuLayout";
import RequireAuth from "../hoc/RequireAuth";
import BoardsMenu from "../pages/boardsMenu/BoardsMenu";
import KanbanLayout from "../layouts/kanbanLayout/KanbanLayout";
import KanbanAuthCheck from "../hoc/KanbanAuthCheck";
import Kanban from "../pages/kanban/Kanban";
import NotFound from "../pages/notFound/NotFound";
import RequireNotAuth from "../hoc/RequireNotAuth";

export const routes = [
	{
		path: '/',
		element: <RequireNotAuth><AuthLayout /></RequireNotAuth>,
		children: [
			{
				index: true,
				element: <HomePage />
			},
			{
				path: 'login',
				element: <Login />
			},
			{
				path: 'registration',
				element: <Registration />
			}
		],
	},
	{
		element: <BoardsMenuLayout />,
		children: [
			{
				path: 'boards',
				element: <RequireAuth><BoardsMenu /></RequireAuth>
			}
		]
	},
	{
		element: <KanbanLayout />,
		children: [
			{
				path: '/boards/:id',
				element: <KanbanAuthCheck><Kanban /></KanbanAuthCheck>
			}
		]
	},
	{
		path: '*',
		element: <NotFound />
	}
]
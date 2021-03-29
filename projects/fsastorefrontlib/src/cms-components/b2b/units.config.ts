import {
  AuthGuard,
  CmsConfig,
  ParamsMapping,
  RoutingConfig,
} from '@spartacus/core';
import {
  ItemService,
  ListService,
  OrganizationTableType,
  UnitApproverListComponent,
  UnitAssignedApproverListComponent,
  UnitChildCreateComponent,
  UnitChildrenComponent,
  UnitFormComponent,
  UnitItemService,
  UnitListComponent,
  UnitListService,
  UnitUserCreateComponent,
  UnitUserListComponent,
  UnitUserRolesFormComponent,
} from '@spartacus/organization/administration/components';
import { AdminGuard } from '@spartacus/organization/administration/core';
import { TableConfig, TableDataCellComponent } from '@spartacus/storefront';
import { AssignmentsComponent } from './unit/assignments';
import { AssignProductCellComponent } from './unit/potential-assignments/cells/assign-product-cell/assign-product-cell.component';
import { PotentialAssignmentsComponent } from './unit/potential-assignments/potential-assignments.component';
import { ActivateProductCellComponent } from './unit/assignments/cells/activate-product-cell/activate-product-cell.component';
import { RemoveProductCellComponent } from './unit/assignments/cells/remove-product-cell/remove-product-cell.component';
import { FSUnitDetailsComponent } from './unit/details';

export const MAX_OCC_INTEGER_VALUE = 2147483647;

export const ROUTE_PARAMS = {
  budgetCode: 'budgetCode',
  unitCode: 'unitCode',
  costCenterCode: 'costCenterCode',
  userCode: 'userCode',
  userGroupCode: 'userGroupCode',
  permissionCode: 'permissionCode',
};

const listPath = `organization/units/:${ROUTE_PARAMS.unitCode}`;

const paramsMapping: ParamsMapping = {
  unitCode: 'uid',
  userCode: 'customerId',
};

export const unitsRoutingConfig: RoutingConfig = {
  routing: {
    routes: {
      orgUnitProductAssignment: {
        paths: [`${listPath}/unitProductAssignments`],
        paramsMapping,
      },
      orgUnitProductAssign: {
        paths: [`${listPath}/unitProductAssignments/assign`],
        paramsMapping,
      },
    },
  },
};

export const unitsCmsConfig: CmsConfig = {
  cmsComponents: {
    ManageUnitsListComponent: {
      component: UnitListComponent,
      providers: [
        {
          provide: ListService,
          useExisting: UnitListService,
        },
        {
          provide: ItemService,
          useExisting: UnitItemService,
        },
      ],
      childRoutes: {
        parent: {
          data: {
            cxPageMeta: {
              breadcrumb: 'orgUnit.breadcrumbs.list',
            },
          },
        },
        children: [
          {
            path: 'create',
            component: UnitFormComponent,
          },
          {
            path: `:${ROUTE_PARAMS.unitCode}`,
            component: FSUnitDetailsComponent,
            data: {
              cxPageMeta: { breadcrumb: 'orgUnit.breadcrumbs.details' },
            },
            children: [
              {
                path: 'edit',
                component: UnitFormComponent,
              },
              {
                path: 'children',
                component: UnitChildrenComponent,
                data: {
                  cxPageMeta: { breadcrumb: 'orgUnit.breadcrumbs.children' },
                },
                children: [
                  {
                    path: 'create',
                    component: UnitChildCreateComponent,
                  },
                ],
              },
              {
                path: 'approvers',
                data: {
                  cxPageMeta: { breadcrumb: 'orgUnit.breadcrumbs.approvers' },
                },
                children: [
                  {
                    path: '',
                    component: UnitAssignedApproverListComponent,
                  },
                  {
                    path: 'assign',
                    component: UnitApproverListComponent,
                  },
                ],
              },
              {
                path: 'users',
                component: UnitUserListComponent,
                data: {
                  cxPageMeta: { breadcrumb: 'orgUnit.breadcrumbs.users' },
                },
                children: [
                  {
                    path: 'create',
                    component: UnitUserCreateComponent,
                  },
                  {
                    path: `:${ROUTE_PARAMS.userCode}/roles`,
                    component: UnitUserRolesFormComponent,
                  },
                ],
              },
              {
                path: 'unitProductAssignments',
                data: {
                  cxPageMeta: {
                    breadcrumb: 'orgUnit.breadcrumbs.productAssignment',
                  },
                },
                children: [
                  {
                    path: '',
                    component: AssignmentsComponent,
                    children: [
                      {
                        path: 'assign',
                        component: PotentialAssignmentsComponent,
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      guards: [AuthGuard, AdminGuard],
    },
  },
};

export function unitsTableConfigFactoryFactory(): TableConfig {
  return unitsTableConfigFactory;
}

export const unitsTableConfigFactory: TableConfig = {
  table: {
    [OrganizationTableType.COST_CENTER]: {
      cells: ['name', 'activate', 'remove'],
      options: {
        cells: {
          name: {
            dataComponent: TableDataCellComponent,
          },
          activate: {
            dataComponent: ActivateProductCellComponent,
          },
          remove: {
            dataComponent: RemoveProductCellComponent,
          },
        },
      },
    },
    [OrganizationTableType.COST_CENTER_BUDGETS]: {
      cells: ['name', 'add'],
      options: {
        cells: {
          add: {
            dataComponent: AssignProductCellComponent,
          },
        },
      },
    },
  },
};

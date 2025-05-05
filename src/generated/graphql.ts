import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  jsonb: { input: any; output: any; }
  timestamptz: { input: string; output: string; }
  uuid: { input: string; output: string; }
};

export type Account = {
  createdAt: Scalars['timestamptz']['output'];
  email: Scalars['String']['output'];
  firstName?: Maybe<Scalars['String']['output']>;
  id: Scalars['uuid']['output'];
  isActive: Scalars['Boolean']['output'];
  lastLogin?: Maybe<Scalars['timestamptz']['output']>;
  lastName?: Maybe<Scalars['String']['output']>;
  role: UserRole;
};

export type AccountFilter = {
  email?: InputMaybe<Scalars['String']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  role?: InputMaybe<UserRole>;
};

/** Boolean expression to compare columns of type "Boolean". All fields are combined with logical 'AND'. */
export type Boolean_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['Boolean']['input']>;
  _gt?: InputMaybe<Scalars['Boolean']['input']>;
  _gte?: InputMaybe<Scalars['Boolean']['input']>;
  _in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['Boolean']['input']>;
  _lte?: InputMaybe<Scalars['Boolean']['input']>;
  _neq?: InputMaybe<Scalars['Boolean']['input']>;
  _nin?: InputMaybe<Array<Scalars['Boolean']['input']>>;
};

export type Query = {
  accounts: Array<Account>;
  accounts_by_pk?: Maybe<Account>;
};


export type QueryAccountsArgs = {
  where?: InputMaybe<AccountFilter>;
};


export type QueryAccounts_By_PkArgs = {
  id: Scalars['uuid']['input'];
};

/** Boolean expression to compare columns of type "String". All fields are combined with logical 'AND'. */
export type String_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['String']['input']>;
  _gt?: InputMaybe<Scalars['String']['input']>;
  _gte?: InputMaybe<Scalars['String']['input']>;
  /** does the column match the given case-insensitive pattern */
  _ilike?: InputMaybe<Scalars['String']['input']>;
  _in?: InputMaybe<Array<Scalars['String']['input']>>;
  /** does the column match the given POSIX regular expression, case insensitive */
  _iregex?: InputMaybe<Scalars['String']['input']>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  /** does the column match the given pattern */
  _like?: InputMaybe<Scalars['String']['input']>;
  _lt?: InputMaybe<Scalars['String']['input']>;
  _lte?: InputMaybe<Scalars['String']['input']>;
  _neq?: InputMaybe<Scalars['String']['input']>;
  /** does the column NOT match the given case-insensitive pattern */
  _nilike?: InputMaybe<Scalars['String']['input']>;
  _nin?: InputMaybe<Array<Scalars['String']['input']>>;
  /** does the column NOT match the given POSIX regular expression, case insensitive */
  _niregex?: InputMaybe<Scalars['String']['input']>;
  /** does the column NOT match the given pattern */
  _nlike?: InputMaybe<Scalars['String']['input']>;
  /** does the column NOT match the given POSIX regular expression, case sensitive */
  _nregex?: InputMaybe<Scalars['String']['input']>;
  /** does the column NOT match the given SQL regular expression */
  _nsimilar?: InputMaybe<Scalars['String']['input']>;
  /** does the column match the given POSIX regular expression, case sensitive */
  _regex?: InputMaybe<Scalars['String']['input']>;
  /** does the column match the given SQL regular expression */
  _similar?: InputMaybe<Scalars['String']['input']>;
};

export type UserRole =
  | 'ADMIN'
  | 'GUEST'
  | 'USER';

/** ordering argument of a cursor */
export type Cursor_Ordering =
  /** ascending ordering of the cursor */
  | 'ASC'
  /** descending ordering of the cursor */
  | 'DESC';

export type Jsonb_Cast_Exp = {
  String?: InputMaybe<String_Comparison_Exp>;
};

/** Boolean expression to compare columns of type "jsonb". All fields are combined with logical 'AND'. */
export type Jsonb_Comparison_Exp = {
  _cast?: InputMaybe<Jsonb_Cast_Exp>;
  /** is the column contained in the given json value */
  _contained_in?: InputMaybe<Scalars['jsonb']['input']>;
  /** does the column contain the given json value at the top level */
  _contains?: InputMaybe<Scalars['jsonb']['input']>;
  _eq?: InputMaybe<Scalars['jsonb']['input']>;
  _gt?: InputMaybe<Scalars['jsonb']['input']>;
  _gte?: InputMaybe<Scalars['jsonb']['input']>;
  /** does the string exist as a top-level key in the column */
  _has_key?: InputMaybe<Scalars['String']['input']>;
  /** do all of these strings exist as top-level keys in the column */
  _has_keys_all?: InputMaybe<Array<Scalars['String']['input']>>;
  /** do any of these strings exist as top-level keys in the column */
  _has_keys_any?: InputMaybe<Array<Scalars['String']['input']>>;
  _in?: InputMaybe<Array<Scalars['jsonb']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['jsonb']['input']>;
  _lte?: InputMaybe<Scalars['jsonb']['input']>;
  _neq?: InputMaybe<Scalars['jsonb']['input']>;
  _nin?: InputMaybe<Array<Scalars['jsonb']['input']>>;
};

/** column ordering options */
export type Order_By =
  /** in ascending order, nulls last */
  | 'asc'
  /** in ascending order, nulls first */
  | 'asc_nulls_first'
  /** in ascending order, nulls last */
  | 'asc_nulls_last'
  /** in descending order, nulls first */
  | 'desc'
  /** in descending order, nulls first */
  | 'desc_nulls_first'
  /** in descending order, nulls last */
  | 'desc_nulls_last';

/** columns and relationships of "organizations" */
export type Organizations = {
  handler: Scalars['String']['output'];
  id: Scalars['uuid']['output'];
  name: Scalars['String']['output'];
  /** An array relationship */
  practices: Array<Practices>;
};


/** columns and relationships of "organizations" */
export type OrganizationsPracticesArgs = {
  distinct_on?: InputMaybe<Array<Practices_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Practices_Order_By>>;
  where?: InputMaybe<Practices_Bool_Exp>;
};

/** Boolean expression to filter rows from the table "organizations". All fields are combined with a logical 'AND'. */
export type Organizations_Bool_Exp = {
  _and?: InputMaybe<Array<Organizations_Bool_Exp>>;
  _not?: InputMaybe<Organizations_Bool_Exp>;
  _or?: InputMaybe<Array<Organizations_Bool_Exp>>;
  handler?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  practices?: InputMaybe<Practices_Bool_Exp>;
};

/** Ordering options when selecting data from "organizations". */
export type Organizations_Order_By = {
  handler?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  practices_aggregate?: InputMaybe<Practices_Aggregate_Order_By>;
};

/** select columns of table "organizations" */
export type Organizations_Select_Column =
  /** column name */
  | 'handler'
  /** column name */
  | 'id'
  /** column name */
  | 'name';

/** Streaming cursor of the table "organizations" */
export type Organizations_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Organizations_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Organizations_Stream_Cursor_Value_Input = {
  handler?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

/** columns and relationships of "practices" */
export type Practices = {
  handler: Scalars['String']['output'];
  id: Scalars['uuid']['output'];
  iisAlias?: Maybe<Scalars['String']['output']>;
  isBillable?: Maybe<Scalars['Boolean']['output']>;
  issName?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  npi: Scalars['String']['output'];
  /** An object relationship */
  organization?: Maybe<Organizations>;
  organizationId?: Maybe<Scalars['uuid']['output']>;
  profile?: Maybe<Scalars['jsonb']['output']>;
  publicSettings?: Maybe<Scalars['jsonb']['output']>;
  state?: Maybe<Scalars['String']['output']>;
  timezone: Scalars['String']['output'];
};


/** columns and relationships of "practices" */
export type PracticesProfileArgs = {
  path?: InputMaybe<Scalars['String']['input']>;
};


/** columns and relationships of "practices" */
export type PracticesPublicSettingsArgs = {
  path?: InputMaybe<Scalars['String']['input']>;
};

/** order by aggregate values of table "practices" */
export type Practices_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Practices_Max_Order_By>;
  min?: InputMaybe<Practices_Min_Order_By>;
};

/** Boolean expression to filter rows from the table "practices". All fields are combined with a logical 'AND'. */
export type Practices_Bool_Exp = {
  _and?: InputMaybe<Array<Practices_Bool_Exp>>;
  _not?: InputMaybe<Practices_Bool_Exp>;
  _or?: InputMaybe<Array<Practices_Bool_Exp>>;
  handler?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  iisAlias?: InputMaybe<String_Comparison_Exp>;
  isBillable?: InputMaybe<Boolean_Comparison_Exp>;
  issName?: InputMaybe<String_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  npi?: InputMaybe<String_Comparison_Exp>;
  organization?: InputMaybe<Organizations_Bool_Exp>;
  organizationId?: InputMaybe<Uuid_Comparison_Exp>;
  profile?: InputMaybe<Jsonb_Comparison_Exp>;
  publicSettings?: InputMaybe<Jsonb_Comparison_Exp>;
  state?: InputMaybe<String_Comparison_Exp>;
  timezone?: InputMaybe<String_Comparison_Exp>;
};

/** order by max() on columns of table "practices" */
export type Practices_Max_Order_By = {
  handler?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  iisAlias?: InputMaybe<Order_By>;
  issName?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  npi?: InputMaybe<Order_By>;
  organizationId?: InputMaybe<Order_By>;
  state?: InputMaybe<Order_By>;
  timezone?: InputMaybe<Order_By>;
};

/** order by min() on columns of table "practices" */
export type Practices_Min_Order_By = {
  handler?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  iisAlias?: InputMaybe<Order_By>;
  issName?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  npi?: InputMaybe<Order_By>;
  organizationId?: InputMaybe<Order_By>;
  state?: InputMaybe<Order_By>;
  timezone?: InputMaybe<Order_By>;
};

/** Ordering options when selecting data from "practices". */
export type Practices_Order_By = {
  handler?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  iisAlias?: InputMaybe<Order_By>;
  isBillable?: InputMaybe<Order_By>;
  issName?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  npi?: InputMaybe<Order_By>;
  organization?: InputMaybe<Organizations_Order_By>;
  organizationId?: InputMaybe<Order_By>;
  profile?: InputMaybe<Order_By>;
  publicSettings?: InputMaybe<Order_By>;
  state?: InputMaybe<Order_By>;
  timezone?: InputMaybe<Order_By>;
};

/** select columns of table "practices" */
export type Practices_Select_Column =
  /** column name */
  | 'handler'
  /** column name */
  | 'id'
  /** column name */
  | 'iisAlias'
  /** column name */
  | 'isBillable'
  /** column name */
  | 'issName'
  /** column name */
  | 'name'
  /** column name */
  | 'npi'
  /** column name */
  | 'organizationId'
  /** column name */
  | 'profile'
  /** column name */
  | 'publicSettings'
  /** column name */
  | 'state'
  /** column name */
  | 'timezone';

/** Streaming cursor of the table "practices" */
export type Practices_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Practices_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Practices_Stream_Cursor_Value_Input = {
  handler?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  iisAlias?: InputMaybe<Scalars['String']['input']>;
  isBillable?: InputMaybe<Scalars['Boolean']['input']>;
  issName?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  npi?: InputMaybe<Scalars['String']['input']>;
  organizationId?: InputMaybe<Scalars['uuid']['input']>;
  profile?: InputMaybe<Scalars['jsonb']['input']>;
  publicSettings?: InputMaybe<Scalars['jsonb']['input']>;
  state?: InputMaybe<Scalars['String']['input']>;
  timezone?: InputMaybe<Scalars['String']['input']>;
};

export type Query_Root = {
  /** fetch data from the table: "organizations" */
  organizations: Array<Organizations>;
  /** fetch data from the table: "organizations" using primary key columns */
  organizations_by_pk?: Maybe<Organizations>;
  /** An array relationship */
  practices: Array<Practices>;
  /** fetch data from the table: "practices" using primary key columns */
  practices_by_pk?: Maybe<Practices>;
};


export type Query_RootOrganizationsArgs = {
  distinct_on?: InputMaybe<Array<Organizations_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Organizations_Order_By>>;
  where?: InputMaybe<Organizations_Bool_Exp>;
};


export type Query_RootOrganizations_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Query_RootPracticesArgs = {
  distinct_on?: InputMaybe<Array<Practices_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Practices_Order_By>>;
  where?: InputMaybe<Practices_Bool_Exp>;
};


export type Query_RootPractices_By_PkArgs = {
  id: Scalars['uuid']['input'];
};

export type Subscription_Root = {
  /** fetch data from the table: "organizations" */
  organizations: Array<Organizations>;
  /** fetch data from the table: "organizations" using primary key columns */
  organizations_by_pk?: Maybe<Organizations>;
  /** fetch data from the table in a streaming manner: "organizations" */
  organizations_stream: Array<Organizations>;
  /** An array relationship */
  practices: Array<Practices>;
  /** fetch data from the table: "practices" using primary key columns */
  practices_by_pk?: Maybe<Practices>;
  /** fetch data from the table in a streaming manner: "practices" */
  practices_stream: Array<Practices>;
};


export type Subscription_RootOrganizationsArgs = {
  distinct_on?: InputMaybe<Array<Organizations_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Organizations_Order_By>>;
  where?: InputMaybe<Organizations_Bool_Exp>;
};


export type Subscription_RootOrganizations_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Subscription_RootOrganizations_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Organizations_Stream_Cursor_Input>>;
  where?: InputMaybe<Organizations_Bool_Exp>;
};


export type Subscription_RootPracticesArgs = {
  distinct_on?: InputMaybe<Array<Practices_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Practices_Order_By>>;
  where?: InputMaybe<Practices_Bool_Exp>;
};


export type Subscription_RootPractices_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Subscription_RootPractices_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Practices_Stream_Cursor_Input>>;
  where?: InputMaybe<Practices_Bool_Exp>;
};

/** Boolean expression to compare columns of type "uuid". All fields are combined with logical 'AND'. */
export type Uuid_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['uuid']['input']>;
  _gt?: InputMaybe<Scalars['uuid']['input']>;
  _gte?: InputMaybe<Scalars['uuid']['input']>;
  _in?: InputMaybe<Array<Scalars['uuid']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['uuid']['input']>;
  _lte?: InputMaybe<Scalars['uuid']['input']>;
  _neq?: InputMaybe<Scalars['uuid']['input']>;
  _nin?: InputMaybe<Array<Scalars['uuid']['input']>>;
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Account: ResolverTypeWrapper<Account>;
  AccountFilter: AccountFilter;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Boolean_comparison_exp: Boolean_Comparison_Exp;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Query: ResolverTypeWrapper<Query>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  String_comparison_exp: String_Comparison_Exp;
  UserRole: UserRole;
  cursor_ordering: Cursor_Ordering;
  jsonb: ResolverTypeWrapper<Scalars['jsonb']['output']>;
  jsonb_cast_exp: Jsonb_Cast_Exp;
  jsonb_comparison_exp: Jsonb_Comparison_Exp;
  order_by: Order_By;
  organizations: ResolverTypeWrapper<Organizations>;
  organizations_bool_exp: Organizations_Bool_Exp;
  organizations_order_by: Organizations_Order_By;
  organizations_select_column: Organizations_Select_Column;
  organizations_stream_cursor_input: Organizations_Stream_Cursor_Input;
  organizations_stream_cursor_value_input: Organizations_Stream_Cursor_Value_Input;
  practices: ResolverTypeWrapper<Practices>;
  practices_aggregate_order_by: Practices_Aggregate_Order_By;
  practices_bool_exp: Practices_Bool_Exp;
  practices_max_order_by: Practices_Max_Order_By;
  practices_min_order_by: Practices_Min_Order_By;
  practices_order_by: Practices_Order_By;
  practices_select_column: Practices_Select_Column;
  practices_stream_cursor_input: Practices_Stream_Cursor_Input;
  practices_stream_cursor_value_input: Practices_Stream_Cursor_Value_Input;
  query_root: ResolverTypeWrapper<{}>;
  subscription_root: ResolverTypeWrapper<{}>;
  timestamptz: ResolverTypeWrapper<Scalars['timestamptz']['output']>;
  uuid: ResolverTypeWrapper<Scalars['uuid']['output']>;
  uuid_comparison_exp: Uuid_Comparison_Exp;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Account: Account;
  AccountFilter: AccountFilter;
  Boolean: Scalars['Boolean']['output'];
  Boolean_comparison_exp: Boolean_Comparison_Exp;
  Int: Scalars['Int']['output'];
  Query: Query;
  String: Scalars['String']['output'];
  String_comparison_exp: String_Comparison_Exp;
  jsonb: Scalars['jsonb']['output'];
  jsonb_cast_exp: Jsonb_Cast_Exp;
  jsonb_comparison_exp: Jsonb_Comparison_Exp;
  organizations: Organizations;
  organizations_bool_exp: Organizations_Bool_Exp;
  organizations_order_by: Organizations_Order_By;
  organizations_stream_cursor_input: Organizations_Stream_Cursor_Input;
  organizations_stream_cursor_value_input: Organizations_Stream_Cursor_Value_Input;
  practices: Practices;
  practices_aggregate_order_by: Practices_Aggregate_Order_By;
  practices_bool_exp: Practices_Bool_Exp;
  practices_max_order_by: Practices_Max_Order_By;
  practices_min_order_by: Practices_Min_Order_By;
  practices_order_by: Practices_Order_By;
  practices_stream_cursor_input: Practices_Stream_Cursor_Input;
  practices_stream_cursor_value_input: Practices_Stream_Cursor_Value_Input;
  query_root: {};
  subscription_root: {};
  timestamptz: Scalars['timestamptz']['output'];
  uuid: Scalars['uuid']['output'];
  uuid_comparison_exp: Uuid_Comparison_Exp;
}>;

export type CachedDirectiveArgs = {
  refresh?: Scalars['Boolean']['input'];
  ttl?: Scalars['Int']['input'];
};

export type CachedDirectiveResolver<Result, Parent, ContextType = any, Args = CachedDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type AccountResolvers<ContextType = any, ParentType extends ResolversParentTypes['Account'] = ResolversParentTypes['Account']> = ResolversObject<{
  createdAt?: Resolver<ResolversTypes['timestamptz'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  firstName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['uuid'], ParentType, ContextType>;
  isActive?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  lastLogin?: Resolver<Maybe<ResolversTypes['timestamptz']>, ParentType, ContextType>;
  lastName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  role?: Resolver<ResolversTypes['UserRole'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  accounts?: Resolver<Array<ResolversTypes['Account']>, ParentType, ContextType, Partial<QueryAccountsArgs>>;
  accounts_by_pk?: Resolver<Maybe<ResolversTypes['Account']>, ParentType, ContextType, RequireFields<QueryAccounts_By_PkArgs, 'id'>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface JsonbScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['jsonb'], any> {
  name: 'jsonb';
}

export type OrganizationsResolvers<ContextType = any, ParentType extends ResolversParentTypes['organizations'] = ResolversParentTypes['organizations']> = ResolversObject<{
  handler?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['uuid'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  practices?: Resolver<Array<ResolversTypes['practices']>, ParentType, ContextType, Partial<OrganizationsPracticesArgs>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PracticesResolvers<ContextType = any, ParentType extends ResolversParentTypes['practices'] = ResolversParentTypes['practices']> = ResolversObject<{
  handler?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['uuid'], ParentType, ContextType>;
  iisAlias?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  isBillable?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  issName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  npi?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  organization?: Resolver<Maybe<ResolversTypes['organizations']>, ParentType, ContextType>;
  organizationId?: Resolver<Maybe<ResolversTypes['uuid']>, ParentType, ContextType>;
  profile?: Resolver<Maybe<ResolversTypes['jsonb']>, ParentType, ContextType, Partial<PracticesProfileArgs>>;
  publicSettings?: Resolver<Maybe<ResolversTypes['jsonb']>, ParentType, ContextType, Partial<PracticesPublicSettingsArgs>>;
  state?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  timezone?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Query_RootResolvers<ContextType = any, ParentType extends ResolversParentTypes['query_root'] = ResolversParentTypes['query_root']> = ResolversObject<{
  organizations?: Resolver<Array<ResolversTypes['organizations']>, ParentType, ContextType, Partial<Query_RootOrganizationsArgs>>;
  organizations_by_pk?: Resolver<Maybe<ResolversTypes['organizations']>, ParentType, ContextType, RequireFields<Query_RootOrganizations_By_PkArgs, 'id'>>;
  practices?: Resolver<Array<ResolversTypes['practices']>, ParentType, ContextType, Partial<Query_RootPracticesArgs>>;
  practices_by_pk?: Resolver<Maybe<ResolversTypes['practices']>, ParentType, ContextType, RequireFields<Query_RootPractices_By_PkArgs, 'id'>>;
}>;

export type Subscription_RootResolvers<ContextType = any, ParentType extends ResolversParentTypes['subscription_root'] = ResolversParentTypes['subscription_root']> = ResolversObject<{
  organizations?: SubscriptionResolver<Array<ResolversTypes['organizations']>, "organizations", ParentType, ContextType, Partial<Subscription_RootOrganizationsArgs>>;
  organizations_by_pk?: SubscriptionResolver<Maybe<ResolversTypes['organizations']>, "organizations_by_pk", ParentType, ContextType, RequireFields<Subscription_RootOrganizations_By_PkArgs, 'id'>>;
  organizations_stream?: SubscriptionResolver<Array<ResolversTypes['organizations']>, "organizations_stream", ParentType, ContextType, RequireFields<Subscription_RootOrganizations_StreamArgs, 'batch_size' | 'cursor'>>;
  practices?: SubscriptionResolver<Array<ResolversTypes['practices']>, "practices", ParentType, ContextType, Partial<Subscription_RootPracticesArgs>>;
  practices_by_pk?: SubscriptionResolver<Maybe<ResolversTypes['practices']>, "practices_by_pk", ParentType, ContextType, RequireFields<Subscription_RootPractices_By_PkArgs, 'id'>>;
  practices_stream?: SubscriptionResolver<Array<ResolversTypes['practices']>, "practices_stream", ParentType, ContextType, RequireFields<Subscription_RootPractices_StreamArgs, 'batch_size' | 'cursor'>>;
}>;

export interface TimestamptzScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['timestamptz'], any> {
  name: 'timestamptz';
}

export interface UuidScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['uuid'], any> {
  name: 'uuid';
}

export type Resolvers<ContextType = any> = ResolversObject<{
  Account?: AccountResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  jsonb?: GraphQLScalarType;
  organizations?: OrganizationsResolvers<ContextType>;
  practices?: PracticesResolvers<ContextType>;
  query_root?: Query_RootResolvers<ContextType>;
  subscription_root?: Subscription_RootResolvers<ContextType>;
  timestamptz?: GraphQLScalarType;
  uuid?: GraphQLScalarType;
}>;

export type DirectiveResolvers<ContextType = any> = ResolversObject<{
  cached?: CachedDirectiveResolver<any, any, ContextType>;
}>;

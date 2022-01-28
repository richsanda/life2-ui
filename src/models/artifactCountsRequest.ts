export interface ArtifactCountsRequest {
    owner: string;
    after: string;
    before: string;
    from?: string[];
    to?: string[];
}

    // params.owner = "rich";
    // if ($scope.year && $scope.month) params['after'] = formatDate(new Date(1990, 8, 1));
    // if ($scope.year && $scope.month) params['before'] = formatDate(new Date());
    // if ($scope.from) params['from'] = $scope.from.split(/[ ,]+/);
    // if ($scope.to) params['to'] = $scope.to.split(/[ ,]+/);
  
from django.db.models import Count
from drf_spectacular.utils import extend_schema
from rest_framework import viewsets
from rest_framework.exceptions import AuthenticationFailed, ValidationError
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .models import Category, Server
from .schema import server_list_docs
from .serializer import CategorySerializer, ServerSerializer


class CategoryListViewSet(viewsets.ViewSet):
    queryset = Category.objects.all()
    
    @extend_schema(responses=CategorySerializer)
    def list(self, request):
        serializer = CategorySerializer(self.queryset, many=True)
        return Response(serializer.data)


class ServerListViewSet(viewsets.ViewSet):
    """
    ViewSet for listing Servers.
    Attributes: queryset (QuerySet): QuerySet list of all Server objects.
    """
    
    queryset = Server.objects.all()
    
    # permission_classes = [IsAuthenticated]
    
    @server_list_docs
    def list(self, request):
        """
        Returns a list of Servers filtered by various parameters.

        This method retrieves a queryset of servers based on the query parameters
        provided in the `request` object. The following query parameters are supported:

        - `category`: Filters servers by category name.
        - `qty`: Limits the number of servers returned.
        - `by_user`: Filters servers by user ID, only returning servers that the user is a member of.
        - `by_server_id`: Filters servers by server ID.
        - `with_num_members`: Annotates each server with the number of members it has.

        Args: request: A Django Request object containing query parameters.

        Returns: A queryset of servers filtered by the specified parameters.
        """
        category = request.query_params.get("category")
        qty = request.query_params.get("qty")
        by_user = request.query_params.get("by_user") == "true"
        by_server_id = request.query_params.get("by_server_id")
        with_num_members = request.query_params.get("with_num_members") == "true"
        
        if category:
            self.queryset = self.queryset.filter(category__name=category)
        
        if by_user:
            if by_user and request.user.is_authenticated:
                user_id = request.user.id
                self.queryset = self.queryset.filter(member=user_id)
            else:
                raise AuthenticationFailed()
        
        if with_num_members:
            self.queryset = self.queryset.annotate(num_members=Count("member"))
        
        if by_server_id:
            if not request.user.is_authenticated:
                raise AuthenticationFailed()
            
            try:
                self.queryset = self.queryset.filter(id=by_server_id)
                if not self.queryset.exists():
                    raise ValidationError(
                        detail=f"Server with id {by_server_id} not found"
                    )
            except ValueError as exc:
                raise ValidationError(detail="Server value error") from exc
        
        if qty:
            self.queryset = self.queryset[: int(qty)]
        
        serializer = ServerSerializer(
            self.queryset,
            many=True,
            context={
                "num_members": with_num_members,
            },
        )
        return Response(serializer.data)

from rest_framework import serializers

from .models import Category, Channel, Server


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = "__all__"


class ChannelSerializer(serializers.ModelSerializer):
    """
    Serializer for Channels.
    This serializer is used to serialize and deserialize Channel objects.
    """
    
    class Meta:
        """Class Meta to get all fields"""
        
        model = Channel
        fields = "__all__"


class ServerSerializer(serializers.ModelSerializer):
    """
    Serializer for Servers.
    This serializer is used to serialize and deserialize Server objects.
    """
    
    num_members = serializers.SerializerMethodField()
    channel_server = ChannelSerializer(many=True)
    category = serializers.StringRelatedField()
    
    class Meta:
        """Class Meta to exclude member field"""
        
        model = Server
        exclude = ("member",)
    
    def get_num_members(self, obj):
        """
        Get the number of members in the Server.
        Args:obj (Server): The Server instance.
        Returns: int: The number of members in the server.
        """
        if hasattr(obj, "num_members"):
            return obj.num_members
        return None
    
    def to_representation(self, instance):
        """
        Serialize the instance to a Python dictionary.
        This method customizes the representation of the serialized Server object.
        Args: instance (Server): The Server instance.
        Returns: dict: The serialized representation of the Server instance.
        """
        data = super().to_representation(instance)
        num_members = self.context.get("num_members")
        if not num_members:
            data.pop("num_members", None)
        return data

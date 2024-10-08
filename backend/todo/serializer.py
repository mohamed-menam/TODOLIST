from rest_framework import serializers
from .models import Todo


class TodoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Todo
        fields = ['id', 'title', 'completed']

    def create(self, validated_data):
        print("=============", self.context['request'])
        user = self.context['request'].user
        print(user)
        validated_data['user'] = user
        return super().create(validated_data)

# class RegisterSerializer(serializers.ModelSerializer):
#     password = serializers.CharField(write_only=True)

#     class Meta:
#         model = User
#         fields = ('user_name', 'email', 'phone_number', 'password')

#     def create(self, validated_data):
#         user = User.objects.create_user(
#             user_name=validated_data['user_name'],
#             username=validated_data['user_name'],
#             email=validated_data['email'],
#             phone_number=validated_data['phone_number']
#         )
#         user.set_password(validated_data['password'])
#         user.save*()
#         return user

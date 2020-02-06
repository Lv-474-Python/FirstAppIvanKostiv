from django import forms
from django.contrib.auth.models import User
from django.contrib.auth import authenticate


class SignUpForm(forms.ModelForm):
    username = forms.CharField(widget=forms.TextInput(
        attrs={'class': 'form-control',
               'placeholder': "Enter your login", }))
    email = forms.EmailField(widget=forms.TextInput(
        attrs={'class': 'form-control',
               'placeholder': "Enter your email", }))
    password = forms.CharField(widget=forms.PasswordInput(
        attrs={'class': 'form-control',
               'placeholder': "Enter your password", }))
    confirm = forms.CharField(widget=forms.PasswordInput(
        attrs={'class': 'form-control',
               'placeholder': "Confirm your password", }))

    class Meta:
        model = User
        fields = [
            'username',
            'email',
            'password',
            'confirm',
        ]

    def clean_username(self):
        """
        Validate username input
        :return: username of raise ValidationError
        """
        try:
            username = User.objects.get(username=self.cleaned_data.get('username'))
            raise forms.ValidationError('User with login %(login)s already exist',
                                        params={'login': username})
        except User.DoesNotExist:
            return self.cleaned_data.get('username')

    def clean_confirm(self):
        """
        Validate confirm password input
        :return: confirmed password or raise ValidationError
        """
        password = self.cleaned_data.get('password')
        confirm = self.cleaned_data.get('confirm')

        if len(password) < 6:
            raise forms.ValidationError("Password must be at least 6 characters long")
        if password != confirm:
            raise forms.ValidationError("Passwords do not match")
        return confirm

    def save(self, commit=True):
        """
        Override default method save. Save user object in database
        :param commit:
        :return: saved user object
        """
        user = super(SignUpForm, self).save(commit=False)
        user.set_password(self.cleaned_data.get('password'))

        if commit:
            user.save()
        return user


class SignInForm(forms.Form):
    username = forms.CharField(label="Login",
                               widget=forms.TextInput(
                                   attrs={'class': 'form-control',
                                          'placeholder': "Enter your login", }))
    password = forms.CharField(widget=forms.PasswordInput(
        attrs={'class': 'form-control',
               'placeholder': "Enter your password", }))

    def clean_password(self):
        """
        Validate password input
        :return: password
        """
        self.get_user()
        return self.cleaned_data.get('password')

    def get_user(self):
        """
        Validate user
        :return: authenticated user
        """
        username, password = self.cleaned_data.get('username'), self.cleaned_data.get('password')
        user = authenticate(username=username, password=password)

        if user is not None:
            return user
        raise forms.ValidationError("Invalid login or password entered")

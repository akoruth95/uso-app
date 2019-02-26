export class User {
    city;
    email;
    firstName;
    lastName;
    nickName;
    phone;
    state;
    streetAddress1;
    streetAddress2;
    userId;
    profilePublic;
    profileUrl;
    userRole;
    zip;

    constructor(city, email, firstName, lastName, nickName, phone, state, streetAddress1, streetAddress2, userId, profilePublic, profileUrl, userRole, zip) {
        this.city = city;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.nickName = nickName;
        this.phone = phone;
        this.state = state;
        this.streetAddress1 = streetAddress1;
        this.streetAddress2 = streetAddress2;
        this.userId = userId;
        this.profilePublic = profilePublic === 'Y' ? true : false;
        this.profileUrl = profileUrl;
        this.userRole = userRole;
        this.zip = zip;
    }
}
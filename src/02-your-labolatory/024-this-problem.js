
const otherUser = {
    role: 'NormalUser',
    getRole() {
        // console.log(this.role)
        setTimeout(() => {
            // console.log(this)
            console.log(this.role)
        }, 2000)
    }
}

otherUser.getRole();
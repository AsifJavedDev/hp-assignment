import HttpClass from "./classes/http.class";

export async function inviteUser(req, res) {
    var invitationBody = req.body;
    var shopId = req.params.shopId;
    var authUrl = "https://url.to.auth.system.com/invitation";

    const invitationResponse = await HttpClass.invitations(req)

    if (invitationResponse.status == 201) {
        const UpdatedUser = await User.findOneAndUpdate({
            authId: invitationResponse.body.authId
        }, {
            authId: invitationResponse.body.authId,
            email: invitationBody.email
        }, {
            upsert: true,
            new: true
        },);
        const shop = Shop.findById(shopId).exec();
        if (!shop) {
            return res.status(404).send(err || {message: 'No shop found'});

        }
        if (shop.invitations.indexOf(invitationResponse.body.invitationId)) {
            shop.invitations.push(invitationResponse.body.invitationId);
        }
        if (shop.users.indexOf(createdUser._id) === -1) {
            shop.users.push(createdUser);
        }
        shop.save();

    } else if (invitationResponse.status === 200) {
        res.status(422).json({
            error: true,
            message: 'User already invited to this shop'
        });
        return;
    }
    else {
        res.status(500).json({
            error: true,
            message: 'Something went wrong '
        });
    }
}


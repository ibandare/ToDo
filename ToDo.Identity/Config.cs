using Duende.IdentityServer;
using Duende.IdentityServer.Models;

namespace ToDo.Identity;

public static class Config
{
    public static IEnumerable<IdentityResource> IdentityResources =>
        new IdentityResource[]
        {
            new IdentityResources.OpenId(),
            new IdentityResources.Profile(),
        };

    public static IEnumerable<ApiScope> ApiScopes =>
        new ApiScope[]
        {
            new ApiScope("api1"),
            new ApiScope(IdentityServerConstants.LocalApi.ScopeName)
        };

    public static IEnumerable<Client> Clients =>
        new Client[]
        {

            // interactive client using code flow + pkce
            new Client
            {
                ClientId = "bff",
                ClientSecrets = { new Secret("secret".Sha256()) },

                AllowedGrantTypes = GrantTypes.Code,

                RedirectUris = { "https://localhost:5003/signin-oidc" },
                FrontChannelLogoutUri = "https://localhost:5003/signout-oidc",
                PostLogoutRedirectUris = { "https://localhost:5003/signout-callback-oidc" },

                AllowOfflineAccess = true,
                AllowedScopes = { "openid", "profile", "api1", IdentityServerConstants.LocalApi.ScopeName }
            },
        };
}

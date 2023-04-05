package com.rimsti.rimsti.repository.appuserrepository;

import com.rimsti.rimsti.model.appuser.AppUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Repository
@Transactional(readOnly = true)
public interface AppUserRepository extends JpaRepository<AppUser, Long> {
    Optional<AppUser> findByEmail(String email);

    @Transactional
    @Modifying
    @Query("UPDATE AppUser a SET a.isEnabled = TRUE WHERE a.email = :email")
    int enableAppUser(@Param("email") String email);

    @Transactional
    @Modifying
    @Query("UPDATE AppUser a SET a.password = :password WHERE a.email = :email")
    void forgotPass(@Param("email") String email, @Param("password") String password);
}

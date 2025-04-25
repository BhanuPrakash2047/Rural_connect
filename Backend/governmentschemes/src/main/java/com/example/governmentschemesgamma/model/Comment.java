    package com.example.governmentschemesgamma.model;

    import jakarta.persistence.*;

    import java.time.LocalDateTime;

    @Entity
    @Table(name="gov_comments")
    public class Comment {

        @Id
        @GeneratedValue(strategy=GenerationType.IDENTITY)
        private Long id;

        @Column
        private String comment;

        @ManyToOne
        @JoinColumn(name="user")
        private PersonDetails user;

        @Column
        private LocalDateTime creationDate;

        @Column
        private Boolean liked=false;

        @ManyToOne
        @JoinColumn(name="scheme_referring")
        private Scheme schemeReferring;


        public PersonDetails getUser() {
            return user;
        }

        public void setUser(PersonDetails user) {
            this.user = user;
        }

        public Long getId() {
            return id;
        }

        public void setId(Long id) {
            this.id = id;
        }

        public String getComment() {
            return comment;
        }

        public void setComment(String comment) {
            this.comment = comment;
        }

        public LocalDateTime getCreationDate() {
            return creationDate;
        }

        public void setCreationDate(LocalDateTime creationDate) {
            this.creationDate = creationDate;
        }

        public Boolean getLiked() {
            return liked;
        }

        public void setLiked(Boolean liked) {
            this.liked = liked;
        }

        public Scheme getSchemeReferring() {
            return schemeReferring;
        }

        public void setSchemeReferring(Scheme schemeReferring) {
            this.schemeReferring = schemeReferring;
        }
    }
